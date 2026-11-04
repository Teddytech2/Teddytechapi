'use strict';

/**
 * TEDDY-TECH API private server configuration.
 * Keep provider credentials here; never import this file in browser code.
 * Hosting platforms may still supply PORT automatically for their web server.
 */
module.exports = Object.freeze({
    providers: Object.freeze({
        shizo: Object.freeze({
            baseUrl: 'https://api.shizo.top',
            apiKey: 'shizo',
            // Set this only to the exact auth header/query field documented by Shizo.
            // The key is configured here, but its transport must not be guessed.
            authHeader: 'X-API-Key'
        }),
        neosoft: Object.freeze({
            baseUrl: 'https://api.neosoft.best'
        }),
        cypherx: Object.freeze({
            baseUrl: 'https://media.cypherxbot.space'
        })
    })
});
