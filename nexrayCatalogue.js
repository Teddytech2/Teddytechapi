'use strict';

// Consolidated NexRay catalogue supplied for TEDDY TECH API V4.
// Input hints are best-effort UI metadata; the upstream remains authoritative.
// Routes in NO_INPUT are intended to return a result without user-supplied data.
const catalogue = {
  AI: `ailsia andresearch bypass chatgpt claude copilot deepimg deepsearch deepseek digi dolphin dracin-tls dream-analyze duck epsilon felo flux-v1 gemini-tts gemini gitagpt glm gpt-3-5-turbo gptimage grammar-check hammer heck ideogram image-to-prompt islamicly islamic jadve jeeves kimi llamacoder lumin magicstudio mathgpt monica morphic muslim nano-banana natalie nexray nowtech openai overchat perplexity powerbrain publio qwenbot riple schoolhub screenapp simi-simi skole sologo story suno text-to-image-v1 turbobot turbosearch venice veo2 veo3 vider webpilot writecream writecream-image zaihvat`,
  Anime: `anichin/detail anichin/genre anichin/genres anichin/home anichin/schedule anichin/search anichin/stream komiku/chapter komiku/detail komiku/home komiku/popular komiku/search samehadaku/detail samehadaku/embed samehadaku/home samehadaku/page samehadaku/schedule samehadaku/search samehadaku/stream`,
  Berita: `antara cnbicndonesia cnn ffnews jkt48 kompas merdeka mlbb sindonews suara`,
  Canvas: `gura jmk mpls musiccard quotly rankcard v1/welcomeleave v2/welcomeleave youtube`,
  Downloader: `aito applemusic bilibili capcut v1/capcut cocofun douyin v1/douyin facebook github googledrive instagram v1/instagram v2/instagram krakenfiles likee mediafire mega npm pinterest rednote savetube scribd sfile smule snackvideo soundcloud spotify spotifyplay v1/spotify terabox threads tiktok twitter videy webmusic ytmp3 v1/ytmp3 ytmp4 v1/ytmp4 ytplay ytplayvid`,
  Editor: `wanted wasted`,
  Ephoto: `anime art ascii borealis botak bravegreen chibi cinematic comic fairglow v1/figure v2/figure ghibli hitam luminare mafia mirror monochrome mountain nft pixel playlist qln real statue street`,
  Fun: `alay livefunfact`,
  Games: `asahotak islamic siapakahaku susunkata tebakkimia tebaklirik tebaktebakan tekateki`,
  Information: `cektagihanpln check-rekening cuaca curs gempa growagarden hari-libur jadwalbola jadwalsholat jadwaltv`,
  Maker: `attp balogo brat bratanime brathd bratvid bratvidhd codesnap fakebank-jago fakedana fakelobyff fakelobyl fakestory fakethreads iqc v1/iqc msg nulls qc smeme ttp ustadz`,
  Payment: `qris saweria/check saweria/create`,
  Primbon: `artinama nomerhoki pasangan penyakit ramalanjodoh ramalanjodohbali rejekihoki-weton sifatusaha-bisnis tafsirmimpi zodiak`,
  Random: `anime ba cecan/china cecan/indonesia cecan/japan cecan/korea cecan/thailand cecan/vietnam loli pap`,
  Search: `8font applemusic bilibili bingimage brave capcut douyin github googleimage groupsor gsmarena happymod istock lyrics npmjs pinterest pinterestvideo playstore resep sfile soundcloud spotify v1/spotify stickerly terabox tidal tiktok tiktokphoto tiktoktrend tiktokuser wallcraft wikipedia youtube`,
  Stalker: `freefire genshin github instagram mlbb v1/mlbb v2/mlbb npmjs pinterest roblox snackvideo threads tiktok twitter youtube`,
  Upload: `index`
};

function titleFromPath(value) {
  return value.split('/').map(part => part.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' · ');
}

const NO_INPUT = new Set([
  'anime/anichin/genres', 'anime/anichin/home', 'anime/anichin/schedule',
  'anime/komiku/home', 'anime/komiku/popular',
  'anime/samehadaku/home', 'anime/samehadaku/schedule',
  ...'antara cnbicndonesia cnn ffnews jkt48 kompas merdeka mlbb sindonews suara'.split(' ').map(x => `berita/${x}`),
  'fun/livefunfact',
  ...'asahotak islamic siapakahaku susunkata tebakkimia tebaklirik tebaktebakan tekateki'.split(' ').map(x => `games/${x}`),
  'information/gempa', 'information/hari-libur', 'information/jadwalbola',
  'information/jadwaltv',
  ...'anime ba cecan/china cecan/indonesia cecan/japan cecan/korea cecan/thailand cecan/vietnam loli pap'.split(' ').map(x => `random/${x}`)
]);

function inputHints(category, route) {
  const full = `${category.toLowerCase()}/${route}`;
  if (NO_INPUT.has(full)) return { inputMode: 'none', params: [] };
  if (category === 'Stalker') return { inputMode: 'params', params: [{ name: 'username', required: true, description: 'Account username or profile handle' }] };
  if (category === 'Downloader') return { inputMode: 'params', params: [{ name: 'url', required: true, description: 'Media URL to download' }] };
  if (category === 'Search') return { inputMode: 'params', params: [{ name: 'query', required: true, description: 'Search keywords' }] };
  if (category === 'AI') {
    const key = /image-to-prompt|deepimg|gptimage|ideogram|magicstudio|nano-banana|text-to-image|writecream-image|flux|veo|suno/.test(route) ? 'prompt' : 'prompt';
    return { inputMode: 'params', params: [{ name: key, required: true, description: 'Prompt or text for this AI endpoint' }] };
  }
  if (category === 'Random') return { inputMode: 'none', params: [] };
  if (category === 'Information' && ['cuaca', 'jadwalsholat'].includes(route)) return { inputMode: 'params', params: [{ name: 'city', required: true, description: 'City name' }] };
  // Do not invent a parameter for less obvious routes. The tester shows a
  // neutral optional JSON body/query area instead of forcing a fake prompt.
  return { inputMode: 'flexible', params: [] };
}

function getNexrayGroups() {
  return Object.entries(catalogue).map(([category, routes]) => ({
    name: `NexRay · ${category}`,
    items: routes.trim().split(/\s+/).map(route => {
      const endpointPath = route === 'index' && category === 'Upload' ? 'upload' : route;
      const hints = inputHints(category, endpointPath);
      const inputDescription = hints.inputMode === 'none'
        ? 'No input required. Open or call this endpoint directly.'
        : hints.inputMode === 'params'
          ? `Required input: ${hints.params.map(param => param.name).join(', ')}. Exact upstream requirements may vary.`
          : 'Input requirements depend on the upstream endpoint. Use documented query parameters or a JSON body if needed.';
      return {
        [titleFromPath(endpointPath)]: {
          desc: `NexRay ${category} endpoint. ${inputDescription}`,
          path: category === 'Upload' ? '/api/nexray/upload' : `/api/nexray/${category.toLowerCase()}/${endpointPath}`,
          methods: category === 'Upload' ? ['POST'] : ['GET', 'POST'],
          inputMode: category === 'Upload' ? 'params' : hints.inputMode,
          params: category === 'Upload' ? [{ name: 'file', required: true, description: 'File to upload (multipart/form-data)' }] : hints.params,
          provider: 'NEXRAY'
        }
      };
    })
  }));
}

module.exports = { getNexrayGroups, catalogue };
