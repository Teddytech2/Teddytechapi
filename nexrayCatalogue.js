'use strict';

// Consolidated NexRay catalogue supplied for TEDDY TECH API V4.
// Parameter names are intentionally not guessed; each endpoint accepts its
// documented upstream query/body parameters through the transparent proxy.
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

function getNexrayGroups() {
  return Object.entries(catalogue).map(([category, routes]) => ({
    name: `NexRay · ${category}`,
    items: routes.trim().split(/\s+/).map(route => {
      const endpointPath = route === 'index' && category === 'Upload' ? 'upload' : route;
      return {
        [titleFromPath(endpointPath)]: {
          desc: `NexRay ${category} endpoint. Parameters depend on the upstream endpoint documentation; use the original query parameters or JSON body.`,
          path: category === 'Upload' ? '/api/nexray/upload' : `/api/nexray/${category.toLowerCase()}/${endpointPath}`,
          methods: category === 'Upload' ? ['POST'] : ['GET', 'POST'],
          provider: 'NEXRAY'
        }
      };
    })
  }));
}

module.exports = { getNexrayGroups, catalogue };
