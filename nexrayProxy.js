'use strict';

const axios = require('axios');
const BASE_URL = require('./config').providers.nexray.baseUrl;

// Separate pass-through namespace for Nexray. Existing provider routes remain untouched.
function register(app) {
    app.all('/api/nexray/*', async (req, res) => {
        const suffix = req.path.replace(/^\/api\/nexray(?=\/)/, '') || '/';
        try {
            const upstream = await axios({
                method: req.method,
                url: `${BASE_URL}${suffix}`,
                params: req.query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
                timeout: 45000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/1.0',
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
            const status = error.response?.status || 502;
            return res.status(status).json({
                status: false, statusCode: status, creator: 'teddy tech',
                message: 'Nexray upstream request failed.',
                detail: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    });
}

module.exports = { register };
