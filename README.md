# TEDDY-TECH API

A public, keyless API collection by **Teddy Tech**, with a refreshed documentation UI and extra media endpoints routed through `https://media.cypherxbot.space/`.

## Features
- **No API key required** for routes hosted by this project.
- Searchable API directory with a live request tester and copyable endpoint URLs.
- Existing media endpoints preserved.
- Added YouTube and AudioMack search/download routes plus a universal social-media downloader.
- `GET /health` reports basic service health.
- CORS enabled for browser integrations.
- Works as a Node.js/Express service and includes a Vercel configuration.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm start
```

The service listens on `PORT` or port `5000`. Open `/` for the documentation UI and `/endpoints` for the endpoint catalogue.

## Added media routes

All routes below require no API key. Query parameters must be URL-encoded.

| Method | Route | Required parameters |
| --- | --- | --- |
| GET | `/download/youtube/:mtype` | `url` |
| GET | `/search/youtube` | `query` |
| GET | `/download/audiomack/:mtype` | `url` |
| GET | `/search/audiomack` | `query` |
| GET | `/download/:platform/:media_type` | `url` |

YouTube `mtype`: `audio`, `video`, `videohd`, `videofhd`, `video2k`, `video4k`.

AudioMack `mtype`: `audio`, `video`.

Universal downloader `platform`: `youtube`, `instagram`, `tiktok`, `facebook`, `twitter`, `audiomack`. `media_type`: `audio` or `video`.

Search endpoints may accept `media_type` and `max_results` as optional parameters, according to the upstream service.

### Examples
```text
GET /download/youtube/audio?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DVIDEO_ID
GET /search/youtube?query=lofi%20music
GET /download/tiktok/video?url=https%3A%2F%2Fwww.tiktok.com%2F...
GET /health
GET /endpoints
```

## Important reliability notes
- “No API key” means this project's routes do not ask callers for a key. It does **not** guarantee unlimited use, zero cost, or permanent uptime.
- Existing endpoints and the added proxy rely on third-party sites/services. They may impose their own limits, block requests, change response formats, or be temporarily unavailable.
- The new proxy uses a fixed upstream host; it does not let callers choose an arbitrary proxy destination.
- Use responsibly and respect the source platforms' terms, copyright, and privacy rules. Do not use this service to bypass access controls or download content you do not have permission to access.
- On a public deployment, consider adding host-level rate limiting to prevent abuse and protect your hosting quota.

## Deployment
Deploy as a standard Node.js service with `npm install` and `npm start`. Vercel settings are included in `vercel.json`. If a platform needs a different start command or root directory, configure it to the repository root.

## Project identity
- Name: TEDDY-TECH API
- Maintainer: Teddy Tech
- Repository: https://github.com/Teddyxmd/TEDDY-XMD


## V4 Shizo catalogue

The user-confirmed Shizo display catalogue is included in `shizoCatalogue.js` (52 named entries; Cosplay intentionally empty). The names and categories are confirmed, but the supplied list did not include Shizo route paths, HTTP methods, parameter schemas, or an API manifest. Therefore the `/api/shizo/...` paths are provisional catalogue slugs and are **not claimed to be live-tested or functional upstream routes**. Obtain Shizo's route definitions before enabling production proxying. Neosoft remains manifest-driven; existing TEDDY-TECH and CypherX integrations are preserved.

## Server configuration (no provider environment variables)

Provider settings are kept in the server-side `config.js` file. The Shizo default key is configured as `shizo`; it is not loaded into the browser bundle. Neosoft and CypherX provider URLs are also configured there. You do not need to create provider API-key environment variables. The hosting platform may still inject `PORT` automatically; that is a web-server runtime setting, not a provider credential.

**Shizo authentication note:** `config.js` currently records `X-API-Key` as the intended header name, but this must match Shizo's actual authentication contract. The key being present in config does not prove the upstream accepts it. Also, the 52 Shizo catalogue entries remain display-only provisional slugs until the real Shizo paths and parameters are available.
