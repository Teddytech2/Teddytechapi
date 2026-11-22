# TEDDY-TECH API Console

A dark green/black TEDDY-TECH API explorer. The **only API source** is:

`https://media.cypherxbot.space/endpoints`

The catalogue is fetched live by the server. The console builds categories from the source's published router definitions, platforms, plugin metadata, and supported media types. It does not maintain a local list of legacy providers or fabricate endpoint responses.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:5000`.

## Vercel deployment

1. Import this repository into Vercel.
2. Keep the included `vercel.json`.
3. Deploy using Node.js 18 or newer.

No provider API keys or legacy Shizo/Neosoft environment variables are required.

## Routes

- `GET /endpoints` — live catalogue normalized for the website.
- `GET /status` — console runtime status.
- The source API routes (`/download`, `/search/:platform`, `/download/:platform/:media_type`, `/plugins`, `/health`) are proxied only when the live catalogue declares them.

Upstream response status, content type, and streaming body are forwarded. Catalogue failures, missing parameters, unsupported platforms/media types, timeouts, and upstream errors are returned as errors rather than fake success responses.

## Source limitation

The upstream catalogue is the authority. If it is unavailable or changes its structure, the console reports that the live catalogue could not be loaded; it does not fall back to stale endpoints.
