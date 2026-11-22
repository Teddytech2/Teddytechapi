'use strict';

/**
 * TEDDY-TECH API private server configuration.
 * Keep provider credentials here; never import this file in browser code.
 * Hosting platforms may still supply PORT automatically for their web server.
 */
module.exports = Object.freeze({
    providers: Object.freeze({
        nexray: Object.freeze({
            baseUrl: 'https://api.nexray.eu.cc'
        })
    })
});
