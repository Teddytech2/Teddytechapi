'use strict';

const axios = require('axios');

const BASE_URL = 'https://media.cypherxbot.space';
const ALLOWED_PLATFORMS = new Set(['youtube', 'instagram', 'tiktok', 'facebook', 'twitter', 'audiomack']);
const ALLOWED_YOUTUBE_TYPES = new Set(['audio', 'video', 'videohd', 'videofhd', 'video2k', 'video4k']);
const client = axios.create({
    baseURL: BASE_URL,
    timeout: 45000,
    headers: {
        'User-Agent': 'TEDDY-TECH-API/1.0 (+https://github.com/Teddyxmd/TEDDY-XMD)',
        'Accept': 'application/json, text/plain, */*'
    },
    maxRedirects: 4
});

function cleanQuery(query) {
    const result = {};
    for (const [key, value] of Object.entries(query || {})) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            result[key] = value;
        }
    }
    return result;
}

function sendError(res, error) {
    const status = error.response?.status && error.response.status >= 400 && error.response.status < 600
        ? error.response.status : 502;
    const upstreamMessage = error.response?.data?.detail ||
        error.response?.data?.error ||
        error.response?.data?.message;
    return res.status(status).json({
        status: false,
        statusCode: status,
        creator: 'teddy tech',
        error: typeof upstreamMessage === 'string'
            ? upstreamMessage
            : (error.code === 'ECONNABORTED'
                ? 'Media provider timed out. Please retry shortly.'
                : 'The media provider could not complete this request. Please retry later.')
    });
}

async function forward(req, res, path) {
    try {
        const response = await client.get(path, { params: cleanQuery(req.query) });
        const contentType = response.headers['content-type'] || '';
        if (contentType.includes('application/json') || typeof response.data === 'object') {
            return res.status(response.status).json(response.data);
        }
        res.type(contentType.includes('text/plain') ? 'text/plain' : 'text/html');
        return res.status(response.status).send(response.data);
    } catch (error) {
        return sendError(res, error);
    }
}

module.exports = {
    register(app) {
        // Keep the upstream host fixed; user-supplied URLs are passed only as a
        // media URL parameter, never used as the proxy destination.
        app.get('/download/youtube/:mtype', (req, res) => {
            if (!ALLOWED_YOUTUBE_TYPES.has(req.params.mtype)) {
                return res.status(400).json({ status: false, error: 'Invalid mtype. Use audio, video, videohd, videofhd, video2k or video4k.' });
            }
            if (!req.query.url) return res.status(400).json({ status: false, error: "Parameter 'url' is required" });
            return forward(req, res, `/download/youtube/${encodeURIComponent(req.params.mtype)}`);
        });

        app.get('/search/youtube', (req, res) => {
            if (!req.query.query) return res.status(400).json({ status: false, error: "Parameter 'query' is required" });
            return forward(req, res, '/search/youtube');
        });

        app.get('/download/audiomack/:mtype', (req, res) => {
            if (!['audio', 'video'].includes(req.params.mtype)) {
                return res.status(400).json({ status: false, error: 'Invalid mtype. Use audio or video.' });
            }
            if (!req.query.url) return res.status(400).json({ status: false, error: "Parameter 'url' is required" });
            return forward(req, res, `/download/audiomack/${encodeURIComponent(req.params.mtype)}`);
        });

        app.get('/search/audiomack', (req, res) => {
            if (!req.query.query) return res.status(400).json({ status: false, error: "Parameter 'query' is required" });
            return forward(req, res, '/search/audiomack');
        });

        app.get('/download/:platform/:media_type', (req, res) => {
            const { platform, media_type } = req.params;
            if (!ALLOWED_PLATFORMS.has(platform)) {
                return res.status(400).json({ status: false, error: 'Unsupported platform.' });
            }
            if (!['audio', 'video'].includes(media_type)) {
                return res.status(400).json({ status: false, error: 'media_type must be audio or video.' });
            }
            if (!req.query.url) return res.status(400).json({ status: false, error: "Parameter 'url' is required" });
            return forward(req, res, `/download/${encodeURIComponent(platform)}/${encodeURIComponent(media_type)}`);
        });
    }
};
