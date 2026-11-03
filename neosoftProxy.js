'use strict';

const axios = require('axios');

const BASE_URL = 'https://api.neosoft.best';
const MANIFEST_URL = `${BASE_URL}/manifest`;
let manifestCache = null;
let manifestLoadedAt = 0;
const CACHE_MS = 10 * 60 * 1000;

async function getManifest() {
    if (manifestCache && Date.now() - manifestLoadedAt < CACHE_MS) return manifestCache;
    const { data } = await axios.get(MANIFEST_URL, {
        timeout: 15000,
        headers: { 'User-Agent': 'TEDDY-TECH-API/2.1 (+https://github.com/Teddyxmd/TEDDY-XMD)' }
    });
    if (!data || !Array.isArray(data.endpoints)) throw new Error('Invalid Neosoft API manifest');
    manifestCache = data;
    manifestLoadedAt = Date.now();
    return data;
}

// Neosoft's manifest has used both object and array parameter descriptions.
// Normalize them without assuming that every parameter is mandatory.
function normalizeParams(params = {}) {
    if (Array.isArray(params)) {
        return params.map(item => {
            if (typeof item === 'string') return { name: item, required: true };
            if (!item || typeof item !== 'object') return null;
            const name = item.name || item.key || item.param || item.parameter;
            if (!name) return null;
            return {
                name: String(name),
                required: item.required === undefined ? (item.optional !== true && String(name).toLowerCase() !== 'sessionid') : !!item.required,
                description: item.description || item.desc || ''
            };
        }).filter(Boolean);
    }
    if (params && typeof params === 'object') {
        return Object.entries(params).map(([name, detail]) => {
            if (detail && typeof detail === 'object') {
                return {
                    name,
                    required: detail.required === undefined ? (detail.optional !== true && String(name).toLowerCase() !== 'sessionid') : !!detail.required,
                    description: detail.description || detail.desc || ''
                };
            }
            return { name, required: detail !== false && String(name).toLowerCase() !== 'sessionid' };
        });
    }
    return [];
}

function sampleParams(params = {}) {
    return normalizeParams(params)
        .map(param => `${param.required ? param.name : '_' + param.name}=`)
        .join('&');
}

async function register(app, allEndpoints) {
    // Register before the 404 handler. Only paths advertised by the upstream
    // manifest are allowed; callers cannot turn this into an open proxy.
    app.all('/api/*', async (req, res) => {
        try {
            const manifest = await getManifest();
            const endpointPath = '/' + req.params[0];
            const endpoint = manifest.endpoints.find(item =>
                item.path === endpointPath &&
                item.category !== 'Downloader' &&
                (item.methods || [item.method || 'GET']).includes(req.method)
            );

            if (!endpoint) {
                return res.status(404).json({
                    status: false,
                    message: 'Unknown Neosoft endpoint or unsupported HTTP method.'
                });
            }

            // Neosoft's public service enforces a daily per-IP quota (currently
            // 150 requests). Forward only query/body data, never arbitrary URLs.
            const config = {
                method: req.method,
                url: `${BASE_URL}${endpoint.path}`,
                params: req.query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
                timeout: 60000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/2.1',
                    ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
                },
                maxContentLength: 25 * 1024 * 1024,
                maxBodyLength: 25 * 1024 * 1024
            };

            const upstream = await axios(config);
            const contentType = upstream.headers['content-type'] || 'application/json; charset=utf-8';
            res.status(upstream.status);
            res.setHeader('Content-Type', contentType);
            if (upstream.headers['cache-control']) res.setHeader('Cache-Control', upstream.headers['cache-control']);
            if (upstream.headers['content-disposition']) res.setHeader('Content-Disposition', upstream.headers['content-disposition']);
            if (upstream.headers['content-length']) res.setHeader('Content-Length', upstream.headers['content-length']);
            return res.send(Buffer.from(upstream.data));
        } catch (error) {
            console.error('[Neosoft proxy]', error.message);
            return res.status(502).json({
                status: false,
                creator: 'Teddy Tech',
                message: 'Neosoft upstream is temporarily unavailable.',
                detail: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    });

    // Add the non-download endpoints to the public /endpoints catalogue.
    try {
        const manifest = await getManifest();
        const grouped = new Map();
        for (const endpoint of manifest.endpoints) {
            if (endpoint.category === 'Downloader') continue;
            const category = endpoint.category || 'Neosoft';
            if (!grouped.has(category)) grouped.set(category, []);
            grouped.get(category).push({
                [endpoint.name]: {
                    desc: endpoint.description || '',
                    path: endpoint.path + (sampleParams(endpoint.params) ? '?' + sampleParams(endpoint.params) : ''),
                    params: normalizeParams(endpoint.params),
                    methods: endpoint.methods || [endpoint.method || 'GET'],
                    provider: 'Neosoft'
                }
            });
        }
        for (const [name, items] of grouped) {
            const existing = allEndpoints.find(group => group.name === name);
            if (existing) existing.items.push(...items);
            else allEndpoints.push({ name, items });
        }
        console.log(`[TEDDY-TECH API] Added ${manifest.endpoints.filter(e => e.category !== 'Downloader').length} Neosoft endpoints`);
    } catch (error) {
        console.warn('[TEDDY-TECH API] Could not load Neosoft endpoint manifest:', error.message);
    }
}

module.exports = { register };
