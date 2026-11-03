# TEDDY-TECH API

A public, keyless API collection by **Teddy Tech**, with a refreshed documentation UI and extra media endpoints routed through `https://media.cypherxbot.space/`.

## Features
- **No API key required** for routes hosted by this project.
- Searchable API directory with a live request tester and copyable endpoint URLs.
- Existing media endpoints preserved.
- Added Neosoft AI, AI image, Pixiv, search, public profile lookup, TextPro and utility endpoints (excluding its downloader category).
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

## Added Neosoft endpoints

The API exposes Neosoft's published non-downloader endpoints under their original paths. Examples:

| Category | Route | Parameters |
| --- | --- | --- |
| AI | `/api/ai/ai-chat` | `text` |
| AI | `/api/ai/gemini` | `text`, optional `sessionId` |
| AI | `/api/ai/perplexity` | `text`, optional `mode` |
| AI Image | `/api/ai-image/ailabs` | `prompt` (POST JSON) |
| AI Image | `/api/ai-image/editimage` | `url`, `prompt` |
| Pixiv | `/api/pixiv/search` | `q`, optional `limit` |
| Pixiv | `/api/pixiv/detail` | `id` |
| Search | `/api/search/youtube` | `q` |
| Search | `/api/search/spotify` | `q` |
| Search | `/api/search/pinterest` | `q` |
| Stalker | `/api/stalker/tiktok` | `username` |
| Stalker | `/api/stalker/roblox` | `username` or user ID |
| TextPro | `/api/textpro/1163` | `text` |
| Tools | `/api/tools/enhanceimage` | `url` |
| Tools | `/api/tools/checker-ban-wa` | `number` |

The full live list is available from `GET /endpoints`. The proxy checks Neosoft's public manifest and only forwards documented paths and allowed HTTP methods; it does not accept arbitrary destination URLs. Non-downloader endpoints are proxied without changing their response body or content type. Neosoft currently advertises a limit of 150 requests per IP per day, so upstream quota and availability still apply. File-upload forms from the upstream documentation are not forwarded as multipart uploads in this integration; use URL-based or JSON request variants where supported.

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
