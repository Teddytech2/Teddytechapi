'use strict';

// TEDDY-TECH API is intentionally public and keyless.
// The options argument is retained for compatibility with endpoint loading.
function wrap(runFn) {
    return async function (req, res, next) {
        try {
            return await runFn(req, res, next);
        } catch (error) {
            console.error('[TEDDY-TECH API] Endpoint error:', error?.message || error);
            if (res.headersSent) return;
            return res.status(500).json({
                status: false,
                statusCode: 500,
                creator: 'teddy tech',
                error: 'The endpoint failed unexpectedly.'
            });
        }
    };
}

module.exports = { wrap };
