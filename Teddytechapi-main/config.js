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
            // Shizo confirms authentication through the `apikey` query parameter.
            authQuery: 'apikey'
        }),
        neosoft: Object.freeze({
            baseUrl: 'https://api.neosoft.best'
        }),
        cypherx: Object.freeze({
            baseUrl: 'https://media.cypherxbot.space'
        })
    })
});
