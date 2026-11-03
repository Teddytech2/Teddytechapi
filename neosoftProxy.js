'use strict';

const axios = require('axios');

const BASE_URL = 'https://api.neosoft.best';
const MANIFEST_URL = `${BASE_URL}/manifest`;
let manifestCache = null;
let manifestLoadedAt = 0;
const CACHE_MS = 5 * 60 * 1000;

async function getManifest() {
    if (manifestCache && Date.now() - manifestLoadedAt < CACHE_MS) return manifestCache;
    const { data } = await axios.get(MANIFEST_URL, {
        timeout: 15000,
        headers: { 'User-Agent': 'TEDDY-TECH-API/2.2' }
    });
    if (!data || !Array.isArray(data.endpoints)) {
        throw new Error('Neosoft manifest did not contain an endpoints array');
    }
    manifestCache = data;
    manifestLoadedAt = Date.now();
    return data;
}

function normalizePath(value) {
    let path = String(value || '').trim();
    if (!path.startsWith('/')) path = `/${path}`;
    // Neosoft's public API routes include /api. Some manifest entries omit it.
    if (!path.startsWith('/api/')) path = `/api${path}`;
    return path.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/api';
}

function endpointMethods(endpoint) {
    let methods = endpoint.methods || endpoint.method || endpoint.httpMethods || ['GET'];
    if (!Array.isArray(methods)) methods = [methods];
    return methods.map(method => String(method).toUpperCase());
}

function normalizeParams(params = {}) {
    if (Array.isArray(params)) {
        return params.map(item => {
            if (typeof item === 'string') return { name: item, required: true };
            if (!item || typeof item !== 'object') return null;
            const name = item.name || item.key || item.param || item.parameter;
            if (!name) return null;
            const optional = item.optional === true || String(name).toLowerCase() === 'sessionid';
            return {
                name: String(name),
                required: item.required === undefined ? !optional : !!item.required,
                description: item.description || item.desc || ''
            };
        }).filter(Boolean);
    }
    if (params && typeof params === 'object') {
        return Object.entries(params).map(([name, detail]) => {
            const optional = String(name).toLowerCase() === 'sessionid' || (detail && typeof detail === 'object' && detail.optional === true);
            return {
                name,
                required: detail && typeof detail === 'object' && detail.required !== undefined
                    ? !!detail.required
                    : detail === false ? false : !optional,
                description: detail && typeof detail === 'object' ? (detail.description || detail.desc || '') : ''
            };
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
    // Proxy only to Neosoft's fixed origin. Preserve the complete /api/... path;
    // the previous version accidentally stripped the /api prefix before matching.
    app.all('/api/*', async (req, res) => {
        try {
            const localPath = normalizePath(req.path);
            let manifest;
            let endpoint = null;

            try {
                manifest = await getManifest();
                endpoint = manifest.endpoints.find(item => {
                    const advertisedPath = normalizePath(item.path || item.endpoint || item.route);
                    return advertisedPath === localPath && endpointMethods(item).includes(req.method.toUpperCase());
                });
            } catch (manifestError) {
                // Manifest downtime must not break documented Neosoft routes.
                console.warn('[Neosoft proxy] Manifest lookup failed; forwarding fixed-origin path:', manifestError.message);
            }

            // The hostname is fixed, and the path is restricted to /api/*.
            // Forwarding the requested path also supports newly-added Neosoft
            // endpoints before the manifest cache refreshes.
            const upstreamPath = endpoint
                ? (String(endpoint.path || endpoint.endpoint || endpoint.route).startsWith('/')
                    ? String(endpoint.path || endpoint.endpoint || endpoint.route)
                    : `/${String(endpoint.path || endpoint.endpoint || endpoint.route)}`)
                : localPath;

            const upstream = await axios({
                method: req.method,
                url: `${BASE_URL}${normalizePath(upstreamPath)}`,
                params: req.query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method.toUpperCase()) ? req.body : undefined,
                timeout: 60000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/2.2',
                    ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
                },
                maxContentLength: 25 * 1024 * 1024,
                maxBodyLength: 25 * 1024 * 1024
            });

            res.status(upstream.status);
            res.setHeader('Content-Type', upstream.headers['content-type'] || 'application/json; charset=utf-8');
            for (const header of ['cache-control', 'content-disposition', 'content-length']) {
                if (upstream.headers[header]) res.setHeader(header, upstream.headers[header]);
            }
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

    // Build the public endpoint catalogue from Neosoft's manifest.
    try {
        const manifest = await getManifest();
        const grouped = new Map();
        for (const endpoint of manifest.endpoints) {
            if (String(endpoint.category || '').toLowerCase() === 'downloader') continue;
            const category = endpoint.category || 'Neosoft';
            if (!grouped.has(category)) grouped.set(category, []);
            const path = normalizePath(endpoint.path || endpoint.endpoint || endpoint.route);
            const sample = sampleParams(endpoint.params || endpoint.parameters);
            grouped.get(category).push({
                [endpoint.name || endpoint.title || path]: {
                    desc: endpoint.description || endpoint.desc || '',
                    path: path + (sample ? '?' + sample : ''),
                    params: normalizeParams(endpoint.params || endpoint.parameters),
                    methods: endpointMethods(endpoint),
                    provider: 'Neosoft'
                }
            });
        }
        for (const [name, items] of grouped) {
            const existing = allEndpoints.find(group => group.name === name);
            if (existing) existing.items.push(...items);
            else allEndpoints.push({ name, items });
        }
        console.log(`[TEDDY-TECH API] Added ${manifest.endpoints.filter(e => String(e.category || '').toLowerCase() !== 'downloader').length} Neosoft endpoints`);
    } catch (error) {
        console.warn('[TEDDY-TECH API] Could not load Neosoft endpoint manifest:', error.message);
    }
}

module.exports = { register };
