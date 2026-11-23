'use strict';

const axios = require('axios');
const BASE_URL = String(require('./config').providers.nexray.baseUrl || '').replace(/\/+$/, '');
const ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

function register(app) {
    // Explicit namespace root gives a useful response instead of the site's HTML 404.
    app.all('/api/nexray', (_req, res) => res.status(400).json({
        status: false,
        creator: 'TEDDY TECH',
        error: 'Endpoint path required',
        example: '/api/nexray/ai/gemini'
    }));

    app.all(/^\/api\/nexray\/(.+)$/, async (req, res) => {
        const suffix = req.path.replace(/^\/api\/nexray\//, '').replace(/^\/+/, '');
        if (!suffix || suffix.split('/').some(part => !part || part === '.' || part === '..')) {
            return res.status(400).json({ status: false, creator: 'TEDDY TECH', error: 'Invalid NexRay endpoint path' });
        }
        if (!ALLOWED_METHODS.has(req.method)) {
            return res.status(405).json({ status: false, creator: 'TEDDY TECH', error: 'Method not allowed' });
        }

        try {
            const upstream = await axios({
                method: req.method,
                url: `${BASE_URL}/${suffix}`,
                params: req.query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
                timeout: 45000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/4.0',
                    Accept: req.headers.accept || '*/*',
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
            const status = error.code === 'ECONNABORTED' ? 504 : 502;
            return res.status(status).json({
                status: false,
                creator: 'TEDDY TECH',
                error: status === 504 ? 'NexRay upstream timed out' : 'NexRay upstream request failed',
                detail: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    });
}

module.exports = { register };
