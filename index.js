'use strict';
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SOURCE = 'https://media.cypherxbot.space';
const CATALOGUE_URL = `${SOURCE}/endpoints`;
const TIMEOUT = 45000;
const CACHE_MS = 60000;

app.set('trust proxy', true);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'docs')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

let cache = null, cacheAt = 0, loading = null, rawCache = null;

function getRawRouteMap(raw) {
  return {
    ...(raw.router_endpoints || {}),
    ...(raw.proxied_worker_endpoints || {})
  };
}

function buildCatalogue(raw) {
  if (!raw || raw.status !== 'ok' || !raw.router_endpoints || !raw.proxied_worker_endpoints ||
      !Array.isArray(raw.plugins) || !Array.isArray(raw.platforms) || !Array.isArray(raw.media_types)) {
    throw new Error('Unexpected live catalogue structure from media API.');
  }
  const groups = new Map();
  const add = (category, name, route, description, params, method = 'GET') => {
    if (!groups.has(category)) groups.set(category, []);
    const entry = {
      desc: description || '',
      path: route,
      params: params || [],
      methods: [method],
      provider: 'CypherX Media API'
    };
    groups.get(category).push({ [name]: entry });
  };

  const router = raw.router_endpoints;
  const worker = raw.proxied_worker_endpoints;
  const routeMeta = (map, key) => map[key] || null;

  if (routeMeta(router, 'GET /download')) {
    const meta = router['GET /download'];
    add('Media', 'Universal Media Download', '/download', meta.description,
      [
        { name: 'url', required: true, description: meta.query_params?.url || 'URL of media to download' },
        ...(meta.query_params?.type ? [{ name: 'type', required: false, description: meta.query_params.type }] : [])
      ]);
  }
  if (routeMeta(router, 'GET /health')) {
    add('System', 'API Health', '/health', router['GET /health'].description, []);
  }
  if (routeMeta(worker, 'GET /plugins')) {
    add('System', 'Plugin Catalogue', '/plugins', worker['GET /plugins'].description, []);
  }

  const searchMeta = routeMeta(worker, 'GET /search/{platform}');
  const downloadMeta = routeMeta(worker, 'GET /download/{platform}/{media_type}');
  const pluginMap = new Map(raw.plugins.map(plugin => [String(plugin.name).toLowerCase(), plugin]));
  if (searchMeta) {
    for (const platform of raw.platforms) {
      add('Search', `${platform} Search`, `/search/${encodeURIComponent(platform)}`,
        searchMeta.description,
        [
          { name: 'query', required: true, description: searchMeta.query_params?.query || 'Search query' },
          ...(searchMeta.query_params?.limit ? [{ name: 'limit', required: false, description: searchMeta.query_params.limit }] : [])
        ]);
    }
  }
  if (downloadMeta) {
    for (const platform of raw.platforms) {
      const plugin = pluginMap.get(String(platform).toLowerCase());
      const supported = Array.isArray(plugin?.supported_media_types) ? plugin.supported_media_types : [];
      for (const type of supported) {
        if (!raw.media_types.includes(type)) continue;
        add('Download', `${platform} ${type} Download`,
          `/download/${encodeURIComponent(platform)}/${encodeURIComponent(type)}`,
          downloadMeta.description,
          [{ name: 'url', required: true, description: 'Media URL' }]);
      }
    }
  }

  return {
    status: true,
    source: CATALOGUE_URL,
    count: [...groups.values()].reduce((sum, items) => sum + items.length, 0),
    endpoints: [...groups.entries()].map(([name, items]) => ({ name, items })),
    updatedAt: new Date().toISOString()
  };
}

async function fetchCatalogue(force = false) {
  if (!force && cache && Date.now() - cacheAt < CACHE_MS) return cache;
  if (loading) return loading;
  loading = (async () => {
    const response = await axios.get(CATALOGUE_URL, {
      timeout: 15000,
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      params: { _t: Date.now() }
    });
    const catalogue = buildCatalogue(response.data);
    rawCache = response.data;
    cache = catalogue;
    cacheAt = Date.now();
    return catalogue;
  })();
  try { return await loading; } finally { loading = null; }
}

function safeError(error, res) {
  const status = Number(error.response?.status);
  const code = error.code;
  let message = 'Upstream API request failed.';
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') message = 'The API host could not be resolved.';
  else if (code === 'ETIMEDOUT' || code === 'ECONNABORTED') message = 'The upstream API request timed out.';
  else if (error.response?.data && typeof error.response.data === 'object') {
    message = String(error.response.data.error || error.response.data.message || error.response.data.detail || message).slice(0, 800);
  } else if (typeof error.response?.data === 'string') message = error.response.data.slice(0, 800);
  return res.status(status >= 400 && status <= 599 ? status : 502).json({
    status: false, statusCode: status >= 400 && status <= 599 ? status : 502, error: message
  });
}

function requestedSourcePath(req) {
  return req.path;
}
async function proxy(req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).json({ status: false, error: 'The source catalogue declares GET for these routes.' });
    if (!rawCache || Date.now() - cacheAt >= CACHE_MS) await fetchCatalogue(true);
    const raw = rawCache;
    const routeMap = getRawRouteMap(raw);
    const pathName = requestedSourcePath(req);
    const isRootDownload = pathName === '/download';
    const isSearch = /^\/search\/[^/]+$/.test(pathName);
    const isDownload = /^\/download\/[^/]+\/[^/]+$/.test(pathName);
    const isPlugins = pathName === '/plugins';
    const isHealth = pathName === '/health';
    const permitted = (isRootDownload && !!routeMap['GET /download']) ||
      (isSearch && !!routeMap['GET /search/{platform}']) ||
      (isDownload && !!routeMap['GET /download/{platform}/{media_type}']) ||
      (isPlugins && !!routeMap['GET /plugins']) || (isHealth && !!routeMap['GET /health']);
    if (!permitted) return res.status(404).json({ status: false, error: 'Route is not published by the live API catalogue.' });

    if (isRootDownload && !req.query.url) return res.status(400).json({ status: false, error: "Required parameter 'url' is missing." });
    if (isSearch && !req.query.query) return res.status(400).json({ status: false, error: "Required parameter 'query' is missing." });
    if (isDownload && !req.query.url) return res.status(400).json({ status: false, error: "Required parameter 'url' is missing." });

    const platforms = new Set(Array.isArray(raw.platforms) ? raw.platforms.map(value => String(value).toLowerCase()) : []);
    const matchSearch = /^\/search\/([^/]+)$/.exec(pathName);
    const matchDownload = /^\/download\/([^/]+)\/([^/]+)$/.exec(pathName);
    if ((matchSearch && !platforms.has(decodeURIComponent(matchSearch[1]).toLowerCase())) ||
        (matchDownload && !platforms.has(decodeURIComponent(matchDownload[1]).toLowerCase()))) {
      return res.status(404).json({ status: false, error: 'Platform is not supported by the live catalogue.' });
    }
    if (matchDownload) {
      const plugin = raw.plugins.find(item => String(item.name).toLowerCase() === decodeURIComponent(matchDownload[1]).toLowerCase());
      if (!plugin || !plugin.supported_media_types?.includes(decodeURIComponent(matchDownload[2])) ||
          !raw.media_types.includes(decodeURIComponent(matchDownload[2]))) {
        return res.status(404).json({ status: false, error: 'Media type is not supported by this platform.' });
      }
    }

    const upstream = await axios.get(`${SOURCE}${req.originalUrl}`, {
      timeout: TIMEOUT,
      responseType: 'stream',
      maxRedirects: 3,
      headers: { Accept: req.headers.accept || '*/*', 'User-Agent': 'TEDDY-TECH-API-Console' },
      validateStatus: () => true
    });
    res.status(upstream.status);
    ['content-type', 'content-disposition', 'cache-control', 'content-length'].forEach(header => {
      if (upstream.headers[header]) res.setHeader(header, upstream.headers[header]);
    });
    upstream.data.on('error', () => { if (!res.headersSent) res.status(502); res.end(); });
    upstream.data.pipe(res);
  } catch (error) {
    safeError(error, res);
  }
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'index.html')));
app.get('/endpoints', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');
    return res.json(await fetchCatalogue(req.query.refresh === '1'));
  } catch (error) {
    return res.status(503).json({ status: false, error: 'The live media API catalogue is unavailable. Please retry.' });
  }
});
app.get('/status', (req, res) => res.json({ status: true, source: CATALOGUE_URL, uptime: Math.floor(process.uptime()) }));
app.get(['/download', '/download/:platform/:media_type', '/search/:platform', '/plugins', '/health'], proxy);
app.use((req, res) => res.status(404).json({ status: false, error: 'Not found. Only routes listed by the live media API are proxied.' }));

if (require.main === module) app.listen(PORT, () => console.log(`TEDDY-TECH API Console listening on ${PORT}`));
module.exports = app;
