'use strict';

const express = require('express');
const fs      = require('fs');
const path    = require('path');
const set     = require('./settings');
const chalk   = require('chalk');

const app  = express();
const PORT = process.env.PORT || 5000;

const logger = {
    info:  (msg) => console.log(chalk.dim.blue('•')  + chalk.dim(' info  - ') + msg),
    ready: (msg) => console.log(chalk.dim.green('•') + chalk.dim(' ready - ') + msg),
    warn:  (msg) => console.log(chalk.dim.yellow('•')+ chalk.dim(' warn  - ') + msg),
    error: (msg) => console.log(chalk.dim.red('•')   + chalk.dim(' error - ') + msg),
};

// ── Core middleware ────────────────────────────────────────────────────────────
app.set('trust proxy', true);
app.set('json spaces', 2);

// CORS — allow any origin (public API)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'docs')));

// ── Response envelope ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = function (data) {
        if (data && typeof data === 'object') {
            return originalJson({
                status:     data.status,
                statusCode: res.statusCode || 200,
                creator:    set.author.toLowerCase(),
                ...data
            });
        }
        return originalJson(data);
    };
    next();
});

// ── Endpoint loader ────────────────────────────────────────────────────────────
function loadEndpointsFromDirectory(directory, baseRoute = '') {
    let endpoints = [];
    const fullPath = path.join(__dirname, directory);

    if (!fs.existsSync(fullPath)) {
        logger.warn(`Directory not found: ${fullPath}`);
        return endpoints;
    }

    logger.info(`Scanning directory: ${directory}...`);
    const { wrap } = require('./rateLimit');

    for (const item of fs.readdirSync(fullPath)) {
        const itemPath = path.join(fullPath, item);
        const stats    = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            console.log('');
            logger.info(`Found subdirectory: ${item}`);
            endpoints = [
                ...endpoints,
                ...loadEndpointsFromDirectory(path.join(directory, item), `${baseRoute}/${item}`)
            ];
        } else if (stats.isFile() && item.endsWith('.js')) {
            try {
                const mod = require(itemPath);
                if (!mod || typeof mod.run !== 'function') continue;

                const endpointName = item.replace('.js', '');
                const endpointPath = `${baseRoute}/${endpointName}`;

                app.all(endpointPath, wrap(mod.run, { bypass: !!mod.noLimit }));

                const fullPathWithParams = mod.params?.length
                    ? endpointPath + '?' + mod.params.map(p => `${p}=`).join('&')
                    : endpointPath;

                const category = mod.category || 'Other';
                let cat = endpoints.find(e => e.name === category);
                if (!cat) { cat = { name: category, items: [] }; endpoints.push(cat); }

                cat.items.push({ [mod.name || endpointName]: { desc: mod.desc || '', path: fullPathWithParams } });
                logger.ready(`${chalk.green(endpointPath)} ${chalk.dim('(')}${chalk.cyan(category)}${chalk.dim(')')}`);
            } catch (err) {
                logger.error(`Failed to load ${itemPath}: ${err.message}`);
            }
        }
    }

    return endpoints;
}

// ── Routes ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'docs', 'index.html')));

logger.info('Starting server initialization...');
logger.info('Loading API endpoints...');
const allEndpoints = loadEndpointsFromDirectory('api');

// Register TEDDY-branded routes for Shizo. The public namespace is
// /api/teddyai/*, while Shizo uses native paths without an /api prefix.
const shizoConfig = require('./config').providers.shizo;
const axios = require('axios');

const SHIZO_CONFIRMED_ROUTES = {
    "/ai/chatgpt": "/ai/gpt",
    "/ai/dall-e-imagine": "/ai/imagine/realism",
    "/ai/ai-image-upscaler": "/ai/upscale",
    "/ai/ai-image-enhancer": "/ai/enhance",
    "/ai/ai-image-sharpener": "/ai/sharpen",
    "/cosplay/genshin-impact/asuma": "/cosplay/genshin-impact/asuma",
    "/cosplay/genshin-impact/ayaka-kamisato": "/cosplay/genshin-impact/ayaka-kamisato",
    "/cosplay/genshin-impact/furina": "/cosplay/genshin-impact/furina",
    "/cosplay/genshin-impact/yaemiko": "/cosplay/genshin-impact/yaemiko",
    "/cosplay/genshin-impact/nahida": "/cosplay/genshin-impact/nahida",
    "/cosplay/genshin-impact/kurumi-tokisaki": "/cosplay/genshin-impact/kurumi-tokisaki",
    "/cosplay/genshin-impact/ganyu-succubus": "/cosplay/genshin-impact/ganyu-succubus",
    "/games/cards-premium": "/games/card",
    "/games/guess-app-name": "/games/gta",
    "/games/guess-song-lyrics": "/games/gtl",
    "/games/guess-the-words": "/games/gtw",
    "/games/emoji-riddles": "/games/emoji-riddle",
    "/fanart/annie": "/fanart/annie",
    "/fanart/mikasa": "/fanart/mikasa",
    "/fanart/nami": "/fanart/nami",
    "/fanart/sakura": "/fanart/sakura",
    "/fanart/sasha": "/fanart/sasha",
    "/sfw/husby": "/sfw/husbu",
    "/sfw/loli": "/sfw/loli",
    "/sfw/neko": "/sfw/neko",
    "/sfw/shota": "/sfw/shota",
    "/sfw/waifu": "/sfw/waifu",
    "/pies/japan": "/pies/japan",
    "/pies/korea": "/pies/korea",
    "/pies/malaysia": "/pies/malaysia",
    "/pies/thailand": "/pies/thailand",
    "/pies/vietnam": "/pies/vietnam",
    "/quote/motivational-quotes": "/quote/quotes",
    "/quote/sweet-night-texts": "/quote/gnsd",
    "/quote/truth-question": "/quote/truth",
    "/quote/dare-task": "/quote/dare",
    "/quote/flirts-english": "/quote/flirt-en",
    "/quote/flirts-hindi": "/quote/flirt",
    "/quote/shayari-hindi": "/quote/shayar",
    "/tools/search-meme": "/tools/meme-search",
    "/tools/forex-exchange": "/tools/currency-convert",
    "/tools/ip-information": "/tools/ip-infp",
    "/tools/weather-info": "/tools/weather",
    "/tools/domain-whois": "/tools/domain-check",
    "/downloader/download": "/downloader/download",
    "/downloader/youtube": "/downloader/youtube",
    "/downloader/twitter": "/downloader/twitter",
    "/downloader/tiktok": "/downloader/tiktok",
    "/downloader/instagram": "/downloader/instagram"
};

function getShizoUpstreamCandidates(publicSuffix) {
    const suffix = (publicSuffix.startsWith('/') ? publicSuffix : `/${publicSuffix}`).replace(/\/+$/, '') || '/';
    // Exact routes supplied by the user take precedence; never guess aliases for them.
    if (SHIZO_CONFIRMED_ROUTES[suffix]) return [SHIZO_CONFIRMED_ROUTES[suffix]];
    // Backward compatibility for catalogue entries whose native paths are not yet confirmed.
    const parts = suffix.split('/').filter(Boolean);
    const category = parts[0] || '';
    const slug = parts.slice(1).join('/') || '';
    const candidates = [suffix];
    if (slug) {
        candidates.push(`/${category}/${slug.replace(/-/g, '')}`);
        candidates.push(`/${category}/${slug.replace(/-/g, '_')}`);
        candidates.push(`/${slug}`);
        candidates.push(`/api${suffix}`);
    }
    return [...new Set(candidates)];
}

async function handleTeddyProvider(req, res, upstreamCandidates) {
    const candidates = Array.isArray(upstreamCandidates) ? upstreamCandidates : [upstreamCandidates];
    try {
        const originalQuery = { ...req.query };
        delete originalQuery.apikey;
        // Accept the common input names used by the public tester while
        // preserving explicitly supplied provider parameters.
        if (candidates.includes('/ai/gpt')) {
            originalQuery.query = originalQuery.query || originalQuery.prompt || originalQuery.text;
            delete originalQuery.prompt;
            delete originalQuery.text;
        }
        const query = { ...originalQuery, [shizoConfig.authQuery || 'apikey']: shizoConfig.apiKey };
        let upstream;
        for (const upstreamPath of candidates) {
            upstream = await axios({
                method: req.method,
                url: `${shizoConfig.baseUrl}${upstreamPath}`,
                params: query,
                data: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) ? req.body : undefined,
                timeout: 60000,
                responseType: 'arraybuffer',
                validateStatus: () => true,
                headers: {
                    'User-Agent': 'TEDDY-TECH-API/4.0',
                    ...(req.headers['content-type'] ? { 'Content-Type': req.headers['content-type'] } : {})
                },
                maxContentLength: 25 * 1024 * 1024,
                maxBodyLength: 25 * 1024 * 1024
            });
            // A 404 is the only response that triggers another route alias.
            if (upstream.status !== 404) break;
        }
        res.status(upstream.status);
        res.setHeader('Content-Type', upstream.headers['content-type'] || 'application/json; charset=utf-8');
        for (const header of ['cache-control', 'content-disposition']) {
            if (upstream.headers[header]) res.setHeader(header, upstream.headers[header]);
        }
        return res.send(Buffer.from(upstream.data));
    } catch (error) {
        logger.warn(`TEDDY provider request failed: ${error.message}`);
        return res.status(502).json({ status: false, creator: 'Teddy Tech', message: 'This endpoint is temporarily unavailable.' });
    }
}

function registerTeddyRoute(publicPrefix) {
    app.all(`${publicPrefix}/*`, (req, res) => {
        const suffix = req.path.slice(publicPrefix.length) || '/';
        return handleTeddyProvider(req, res, getShizoUpstreamCandidates(suffix));
    });
}
registerTeddyRoute('/api/teddyai');
// Keep the previous public namespace working as a backward-compatible alias.
registerTeddyRoute('/api/teddy');
// Older unprefixed AI aliases remain available for compatibility.
app.all('/api/ai/chatgpt', (req, res) => handleTeddyProvider(req, res, ['/ai/gpt']));
app.all('/api/ai/*', (req, res) => handleTeddyProvider(req, res, getShizoUpstreamCandidates(req.path.replace(/^\/api(?=\/)/, ''))));

// Add Neosoft AI, image, search, Pixiv, profile and utility endpoints.
// The TEDDY route handler above owns /api/teddyai/*, so these requests cannot
// fall through to Neosoft's manifest matcher.
const neosoftCatalogue = require('./neosoftProxy').register(app, allEndpoints);
const shizoCatalogue = require('./shizoCatalogue');

// Additional public endpoints provided through the fixed CypherX media service.
require('./cypherxProxy').register(app);
allEndpoints.push({
    name: 'Media Provider',
    items: [
        { 'YouTube Download': { desc: 'Download YouTube audio or video in multiple qualities.', path: '/download/youtube/audio?url=' } },
        { 'YouTube Search': { desc: 'Search YouTube; optionally download the first result with media_type.', path: '/search/youtube?query=' } },
        { 'AudioMack Download': { desc: 'Download AudioMack audio or video.', path: '/download/audiomack/audio?url=' } },
        { 'AudioMack Search': { desc: 'Search AudioMack; optionally download the first result with media_type.', path: '/search/audiomack?query=' } },
        { 'Instagram Download': { desc: 'Download supported Instagram media.', path: '/download/instagram/video?url=' } },
        { 'TikTok Download': { desc: 'Download supported TikTok media.', path: '/download/tiktok/video?url=' } },
        { 'Facebook Download': { desc: 'Download supported Facebook media.', path: '/download/facebook/video?url=' } },
        { 'Twitter / X Download': { desc: 'Download supported Twitter / X media.', path: '/download/twitter/video?url=' } },
        { 'Universal Media Download': { desc: 'Download audio or video from a supported platform.', path: '/download/{platform}/{media_type}' } }
    ]
});
console.log('');
logger.ready(`Loaded ${allEndpoints.reduce((n, c) => n + c.items.length, 0)} endpoints`);

app.get('/endpoints', async (req, res) => {
    try {
        // Refresh on demand with a short server-side TTL. ?refresh=1 bypasses it.
        const catalogue = req.query.refresh === '1'
            ? await neosoftCatalogue.refresh()
            : await neosoftCatalogue.getCatalogue();
        const combined = [...catalogue, ...shizoCatalogue];
        const count = combined.reduce((n, category) => n + category.items.length, 0);
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.json({ status: true, count, endpoints: combined, updatedAt: new Date().toISOString() });
    } catch (error) {
        logger.warn(`Endpoint catalogue refresh failed: ${error.message}`);
        res.status(503).json({ status: false, message: 'Endpoint catalogue is temporarily unavailable.' });
    }
});

app.get('/set', (req, res) => res.json({ status: true, ...set }));

app.get('/health', (req, res) => res.json({
    status: true,
    name: set.name.main,
    creator: set.author,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
}));

// ── Audio stream proxy ─────────────────────────────────────────────────────────
app.get('/stream', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'url is required' });

    const axios = require('axios');
    try {
        const upstream = await axios({
            method: 'get', url, responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36',
                ...(req.headers['range'] ? { Range: req.headers['range'] } : {}),
            },
            timeout: 30000,
        });
        res.setHeader('Content-Type',  upstream.headers['content-type']  || 'audio/webm');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'no-cache');
        if (upstream.headers['content-length']) res.setHeader('Content-Length', upstream.headers['content-length']);
        if (upstream.headers['content-range'])  res.setHeader('Content-Range',  upstream.headers['content-range']);
        res.status(upstream.status === 206 ? 206 : 200);
        upstream.data.pipe(res);
        req.on('close', () => upstream.data.destroy());
    } catch (e) {
        if (!res.headersSent) res.status(502).json({ error: 'Stream proxy error: ' + e.message });
    }
});

// ── Error handlers ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    logger.info(`404: ${req.method} ${req.path}`);
    res.status(404).sendFile(path.join(__dirname, 'docs', 'err', '404.html'));
});

app.use((err, req, res, _next) => {
    logger.error(`500: ${err.message}`);
    res.status(500).sendFile(path.join(__dirname, 'docs', 'err', '500.html'));
});

// ── Listen — skipped on Vercel / other serverless platforms ───────────────────
if (require.main === module) {
    app.listen(PORT, () => {
        console.log('');
        logger.ready('Server started successfully');
        logger.info(`Local:   ${chalk.cyan(`http://localhost:${PORT}`)}`);

        try {
            const { networkInterfaces } = require('os');
            const nets = networkInterfaces();
            for (const addrs of Object.values(nets)) {
                for (const net of addrs) {
                    if (net.family === 'IPv4' && !net.internal)
                        logger.info(`Network: ${chalk.cyan(`http://${net.address}:${PORT}`)}`);
                }
            }
        } catch { /* ignore */ }

        logger.info(chalk.dim('Ready for connections'));
    });
}

module.exports = app;
