'use strict';

const axios = require('axios');

const BASE_URL = 'https://api.neosoft.best';
const MANIFEST_URL = `${BASE_URL}/manifest`;
const CACHE_MS = 60 * 1000;
let manifestCache = null;
let manifestLoadedAt = 0;
let manifestPromise = null;

function isDownloader(endpoint) {
    return String(endpoint?.category || '').trim().toLowerCase() === 'downloader';
}

function normalizeMethods(endpoint) {
    const raw = endpoint?.methods || endpoint?.method || ['GET'];
    const list = Array.isArray(raw) ? raw : String(raw).split(/[|,\s]+/);
    return [...new Set(list.map(method => String(method).toUpperCase()).filter(Boolean))];
}

function normalizeParams(params = {}) {
    if (Array.isArray(params)) {
        return params.map(item => {
            if (typeof item === 'string') {
                const name = item.replace(/^_/, '');
                return { name, required: !item.startsWith('_') && name.toLowerCase() !== 'sessionid', description: '' };
            }
            if (!item || typeof item !== 'object') return null;
            const name = item.name || item.key || item.param || item.parameter;
            if (!name) return null;
            const optional = item.optional === true || String(name).toLowerCase() === 'sessionid';
            return {
                name: String(name).replace(/^_/, ''),
                required: item.required === undefined ? !optional : !!item.required,
                description: item.description || item.desc || ''
            };
        }).filter(Boolean);
    }
    if (params && typeof params === 'object') {
        return Object.entries(params).map(([rawName, detail]) => {
            const name = rawName.replace(/^_/, '');
            const required = detail && typeof detail === 'object'
                ? (detail.required === undefined ? detail.optional !== true && name.toLowerCase() !== 'sessionid' : !!detail.required)
                : detail !== false && !rawName.startsWith('_') && name.toLowerCase() !== 'sessionid';
            return { name, required, description: detail?.description || detail?.desc || '' };
        });
    }
    return [];
}

function normalizeEndpoint(endpoint) {
    if (!endpoint || typeof endpoint !== 'object') return null;
    const path = String(endpoint.path || endpoint.endpoint || '').trim();
    if (!path.startsWith('/')) return null;
    return {
        name: endpoint.name || endpoint.title || path.split('/').filter(Boolean).pop() || path,
        path,
        category: endpoint.category || 'Neosoft',
        description: endpoint.description || endpoint.desc || '',
        methods: normalizeMethods(endpoint),
        params: normalizeParams(endpoint.params || endpoint.parameters),
        provider: 'Neosoft'
    };
}

async function fetchManifest(force = false) {
    if (!force && manifestCache && Date.now() - manifestLoadedAt < CACHE_MS) return manifestCache;
    if (manifestPromise) return manifestPromise;
    manifestPromise = (async () => {
        const response = await axios.get(MANIFEST_URL, {
            timeout: 20000,
            headers: {
                'User-Agent': 'TEDDY-TECH-API/3.0',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            },
            params: { _t: Date.now() }
        });
        const data = response.data;
        if (!data || !Array.isArray(data.endpoints)) {
            throw new Error('Neosoft manifest did not contain an endpoints array');
        }
        manifestCache = data;
        manifestLoadedAt = Date.now();
        return manifestCache;
    })();
    try {
        return await manifestPromise;
    } finally {
        manifestPromise = null;
    }
}

function toCatalogueGroups(manifest) {
    const groups = new Map();
    for (const raw of manifest.endpoints) {
        if (isDownloader(raw)) continue;
        const endpoint = normalizeEndpoint(raw);
        if (!endpoint) continue;
        const category = endpoint.category;
        if (!groups.has(category)) groups.set(category, []);
        const sample = endpoint.params.map(param => `${param.required ? '' : '_'}${encodeURIComponent(param.name)}=`).join('&');
        const item = {
            desc: endpoint.description,
            path: endpoint.path + (sample ? `?${sample}` : ''),
            params: endpoint.params,
            methods: endpoint.methods,
            provider: 'Neosoft'
        };
        groups.get(category).push({ [endpoint.name]: item });
    }
    return [...groups.entries()].map(([name, items]) => ({ name, items }));
}

function mergeCatalogue(localEndpoints, neosoftGroups) {
    const result = localEndpoints.map(group => ({ name: group.name, items: [...group.items] }));
    for (const group of neosoftGroups) {
        const existing = result.find(item => item.name.toLowerCase() === group.name.toLowerCase());
        if (existing) {
            const known = new Set(existing.items.map(item => Object.keys(item)[0]));
            existing.items.push(...group.items.filter(item => !known.has(Object.keys(item)[0])));
        } else result.push(group);
    }
    return result;
}

function register(app, localEndpoints) {
    // Register the proxy before the application's HTML 404 handler.
    app.all('/api/*', async (req, res) => {
        try {
            const manifest = await fetchManifest();
            const requestedPath = req.path.replace(/\/+$/, '') || '/';
            const endpoint = manifest.endpoints
                .map(normalizeEndpoint)
                .filter(Boolean)
                .find(item => item.path.replace(/\/+$/, '') === requestedPath && item.methods.includes(req.method));

            if (!endpoint || isDownloader(manifest.endpoints.find(item => normalizeEndpoint(item)?.path === endpoint.path))) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    creator: 'Teddy Tech',
                    message: 'Unknown Neosoft endpoint or unsupported HTTP method.',
                    requested: { method: req.method, path: requestedPath }
                });
            }

            const upstream = await axios({
                method: req.method,
                url: `${BASE_URL}${endpoint.path}`,
                params: req.query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
                timeout: 60000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/3.0',
                    ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
                },
                maxContentLength: 25 * 1024 * 1024,
                maxBodyLength: 25 * 1024 * 1024
            });
            res.status(upstream.status);
            res.setHeader('Content-Type', upstream.headers['content-type'] || 'application/json; charset=utf-8');
            for (const header of ['cache-control', 'content-disposition']) {
                if (upstream.headers[header]) res.setHeader(header, upstream.headers[header]);
            }
            return res.send(Buffer.from(upstream.data));
        } catch (error) {
            console.error('[Neosoft proxy]', error.message);
            // If a refresh fails, try the last known manifest before reporting an error.
            if (manifestCache && !res.headersSent) {
                return res.status(502).json({ status: false, creator: 'Teddy Tech', message: 'Neosoft upstream request failed.', detail: process.env.NODE_ENV === 'development' ? error.message : undefined });
            }
            return res.status(503).json({ status: false, creator: 'Teddy Tech', message: 'Neosoft manifest is temporarily unavailable.' });
        }
    });

    // Warm the manifest in the background; never block server startup.
    fetchManifest().catch(error => console.warn('[TEDDY-TECH API] Neosoft manifest unavailable at startup:', error.message));

    return {
        async getCatalogue() {
            try {
                const manifest = await fetchManifest();
                return mergeCatalogue(localEndpoints, toCatalogueGroups(manifest));
            } catch (error) {
                console.warn('[TEDDY-TECH API] Using last available Neosoft catalogue:', error.message);
                if (manifestCache) return mergeCatalogue(localEndpoints, toCatalogueGroups(manifestCache));
                return mergeCatalogue(localEndpoints, []);
            }
        },
        async refresh() {
            const manifest = await fetchManifest(true);
            return mergeCatalogue(localEndpoints, toCatalogueGroups(manifest));
        }
    };
}

module.exports = { register, fetchManifest, normalizeParams };
