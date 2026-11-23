# TEDDY-TECH API

A public, keyless API collection by **Teddy Tech**, with a refreshed documentation UI and media endpoints routed through Nexray (`https://api.nexray.eu.cc`).

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



## Nexray full category pass-through

The external-provider integration is Nexray only. Requests are forwarded through `/api/nexray/` while retaining the upstream path, query parameters and request body. The documentation endpoint catalogue lists Nexray's published category groups. The public Nexray directory reports 373+ endpoints; its currently listed category counts are included in this project's catalogue, but individual endpoint paths and parameter schemas are not duplicated because the upstream documentation pages could not be fully retrieved during this update.

| Nexray category | Listed endpoints | Proxy namespace |
| --- | ---: | --- |
| AI | 69 | `/api/nexray/ai/{endpoint}` |
| Anime | 19 | `/api/nexray/anime/{endpoint}` |
| Berita | 10 | `/api/nexray/berita/{endpoint}` |
| Canvas | 9 | `/api/nexray/canvas/{endpoint}` |
| Downloader | 42 | `/api/nexray/downloader/{endpoint}` |
| Editor | 2 | `/api/nexray/editor/{endpoint}` |
| Ephoto | 26 | `/api/nexray/ephoto/{endpoint}` |
| Fun | 2 | `/api/nexray/fun/{endpoint}` |
| Games | 8 | `/api/nexray/games/{endpoint}` |
| Information | 10 | `/api/nexray/information/{endpoint}` |
| Maker | 22 | `/api/nexray/maker/{endpoint}` |
| Payment | 3 | `/api/nexray/payment/{endpoint}` |
| Primbon | 10 | `/api/nexray/primbon/{endpoint}` |
| Random | 10 | `/api/nexray/random/{endpoint}` |
| Search | 33 | `/api/nexray/search/{endpoint}` |
| Stalker | 15 | `/api/nexray/stalker/{endpoint}` |
| Textpro | 22 | `/api/nexray/textpro/{endpoint}` |
| Tools | 60 | `/api/nexray/tools/{endpoint}` |
| Uploader | 1 | `/api/nexray/uploader/{endpoint}` |

**Example:** upstream `GET /ai/gemini?text=Hello` is called through `GET /api/nexray/ai/gemini?text=Hello`. The upstream's documented method and parameters must be used.

The catalogue category counts are informational and sourced from Nexray's category page; this update does not claim to have independently verified every individual route.

## NexRay API proxy

The complete NexRay route catalogue is served from `/endpoints`. Calls are proxied transparently through `/api/nexray/<original-upstream-path>`.

Examples:

- `GET /api/nexray/ai/gemini?prompt=Hello`
- `GET /api/nexray/downloader/tiktok?url=<video-url>`
- `GET /api/nexray/search/youtube?query=<search-term>`
- `GET /api/nexray/stalker/instagram?username=<username>`
- `POST /api/nexray/upload` (send the upstream-required multipart or JSON body)

The query/body parameter names above are illustrative only; use the parameter names required by each NexRay endpoint. The proxy does not guess or rewrite upstream parameters.
