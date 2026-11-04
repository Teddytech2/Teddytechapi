'use strict';

// TEDDY-TECH public catalogue. Confirmed upstream paths are explicit; unconfirmed entries remain provisional.
module.exports = [
  {
    "name": "TEDDY · AI",
    "items": [
      {
        "ChatGPT": {
          "desc": "Send a prompt to ChatGPT and receive a JSON response.",
          "path": "/api/teddyai/ai/chatgpt?prompt=",
          "params": [
            {
              "name": "prompt",
              "required": true,
              "description": "Enter the message you want ChatGPT to answer"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/ai/gpt"
        }
      },
      {
        "Dall E Imagine": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/ai/dall-e-imagine",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/ai/imagine/realism"
        }
      },
      {
        "AI Image Upscaler": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/ai/ai-image-upscaler",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/ai/upscale"
        }
      },
      {
        "AI Image Enhancer": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/ai/ai-image-enhancer",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/ai/enhance"
        }
      },
      {
        "AI Image Sharpener": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/ai/ai-image-sharpener",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/ai/sharpen"
        }
      }
    ]
  },
  {
    "name": "TEDDY · Cosplay",
    "items": [
      {
        "Asuma": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/asuma",
          "upstreamPath": "/cosplay/genshin-impact/asuma",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Ayaka Kamisato": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/ayaka-kamisato",
          "upstreamPath": "/cosplay/genshin-impact/ayaka-kamisato",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Furina": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/furina",
          "upstreamPath": "/cosplay/genshin-impact/furina",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Yae Miko": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/yaemiko",
          "upstreamPath": "/cosplay/genshin-impact/yaemiko",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Nahida": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/nahida",
          "upstreamPath": "/cosplay/genshin-impact/nahida",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Kurumi Tokisaki": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/kurumi-tokisaki",
          "upstreamPath": "/cosplay/genshin-impact/kurumi-tokisaki",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Ganyu Succubus": {
          "desc": "Confirmed Shizo Cosplay route. Input parameters have not been specified.",
          "path": "/api/teddyai/cosplay/genshin-impact/ganyu-succubus",
          "upstreamPath": "/cosplay/genshin-impact/ganyu-succubus",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      }
    ]
  },
  {
    "name": "TEDDY · Games",
    "items": [
      {
        "Cards (premium)": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/games/cards-premium",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/games/card"
        }
      },
      {
        "Guess App Name": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/games/guess-app-name",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/games/gta"
        }
      },
      {
        "Guess Song Lyrics": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/games/guess-song-lyrics",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/games/gtl"
        }
      },
      {
        "Guess The Words": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/games/guess-the-words",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/games/gtw"
        }
      },
      {
        "Emoji Riddles": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/games/emoji-riddles",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/games/emoji-riddle"
        }
      }
    ]
  },
  {
    "name": "TEDDY · Fanart",
    "items": [
      {
        "Annie": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/fanart/annie",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/fanart/annie"
        }
      },
      {
        "Mikasa": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/fanart/mikasa",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/fanart/mikasa"
        }
      },
      {
        "Nami": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/fanart/nami",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/fanart/nami"
        }
      },
      {
        "Sakura": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/fanart/sakura",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/fanart/sakura"
        }
      },
      {
        "Sasha": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/fanart/sasha",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/fanart/sasha"
        }
      },
      {
        "Vivi": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/vivi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      }
    ]
  },
  {
    "name": "TEDDY · SFW",
    "items": [
      {
        "Husbu": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/sfw/husby",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/sfw/husbu"
        }
      },
      {
        "Loli": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/sfw/loli",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/sfw/loli"
        }
      },
      {
        "Neko": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/sfw/neko",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/sfw/neko"
        }
      },
      {
        "Shota": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/sfw/shota",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/sfw/shota"
        }
      },
      {
        "Waifu": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/sfw/waifu",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/sfw/waifu"
        }
      }
    ]
  },
  {
    "name": "TEDDY · Pies",
    "items": [
      {
        "Indian Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/indian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "China Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/china-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Indonesian Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/indonesian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Japan Pies": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/pies/japan",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/pies/japan"
        }
      },
      {
        "Korea Pies": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/pies/korea",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/pies/korea"
        }
      },
      {
        "Malaysia Pies": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/pies/malaysia",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/pies/malaysia"
        }
      },
      {
        "Thailand Pies": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/pies/thailand",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/pies/thailand"
        }
      },
      {
        "Vietnam Pies": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/pies/vietnam",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/pies/vietnam"
        }
      }
    ]
  },
  {
    "name": "TEDDY · Quote",
    "items": [
      {
        "Motivational Quotes": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/quote/motivational-quotes",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/gnsd"
        }
      },
      {
        "Truth (Question)": {
          "desc": "Returns a truth question prompt. No additional input is required.",
          "path": "/api/teddyai/quote/truth-question",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/truth"
        }
      },
      {
        "Dare (Task)": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/quote/dare-task",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/dare"
        }
      },
      {
        "Flirts (English)": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/quote/flirts-english",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/flirt-en"
        }
      },
      {
        "Flirts (Hindi)": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/quote/flirts-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/flirt"
        }
      },
      {
        "Shayari (Hindi)": {
          "desc": "TEDDY Tools endpoint for meme search. Pass the search input required by the upstream service; the response is returned by the API.",
          "path": "/api/teddyai/quote/shayari-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/quote/shayar"
        }
      },
      {
        "Sweet Night Texts": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/sweet-night-texts",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      }
    ]
  },
  {
    "name": "TEDDY · Tools",
    "items": [
      {
        "S Links (Shizo URL)": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/s-links-shizo-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Paste the URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Bit.ly Short URL": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/bit-ly-short-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Paste the URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Tiny Short URL": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/tiny-short-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Paste the URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Screenshot Website": {
          "desc": "TEDDY-TECH Tools endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/screenshot-website",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Paste the URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Remove Background": {
          "desc": "TEDDY-TECH Tools endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/remove-background",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Paste the URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Search Meme": {
          "desc": "Search for memes using the upstream service. Supply its supported search parameters; the API returns the upstream result.",
          "path": "/api/teddyai/tools/search-meme",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/tools/meme-search"
        }
      },
      {
        "Forex Exchange": {
          "desc": "Convert currencies using the upstream exchange service. Supply its supported currency and amount parameters.",
          "path": "/api/teddyai/tools/forex-exchange",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/tools/currency-convert"
        }
      },
      {
        "IP Information": {
          "desc": "Retrieve IP address information using the upstream service. Supply an IP address if required.",
          "path": "/api/teddyai/tools/ip-information",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/tools/ip-infp"
        }
      },
      {
        "Weather Info": {
          "desc": "Retrieve weather information using the upstream service. Supply its supported location parameter.",
          "path": "/api/teddyai/tools/weather-info",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/tools/weather"
        }
      },
      {
        "Domain WhoIs": {
          "desc": "Retrieve domain registration and lookup information using the upstream service. Supply a domain if required.",
          "path": "/api/teddyai/tools/domain-whois",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true,
          "upstreamPath": "/tools/domain-check"
        }
      }
    ]
  },
  {
    "name": "TEDDY · Downloader",
    "items": [
      {
        "Universal Downloader": {
          "desc": "Download supported media from a supplied public URL.",
          "path": "/api/teddyai/downloader/download?url=",
          "params": [{"name": "url", "required": true, "description": "Paste the media URL"}],
          "methods": ["GET"], "provider": "TEDDY-TECH", "verified": true,
          "upstreamPath": "/downloader/download"
        }
      },
      {
        "YouTube Downloader": {
          "desc": "Download media from a YouTube video URL.",
          "path": "/api/teddyai/downloader/youtube?url=",
          "params": [{"name": "url", "required": true, "description": "Paste the YouTube video URL"}],
          "methods": ["GET"], "provider": "TEDDY-TECH", "verified": true,
          "upstreamPath": "/downloader/youtube"
        }
      },
      {
        "Twitter/X Downloader": {
          "desc": "Download media from a Twitter/X post URL.",
          "path": "/api/teddyai/downloader/twitter?url=",
          "params": [{"name": "url", "required": true, "description": "Paste the Twitter/X post URL"}],
          "methods": ["GET"], "provider": "TEDDY-TECH", "verified": true,
          "upstreamPath": "/downloader/twitter"
        }
      },
      {
        "TikTok Downloader": {
          "desc": "Download media from a TikTok video URL.",
          "path": "/api/teddyai/downloader/tiktok?url=",
          "params": [{"name": "url", "required": true, "description": "Paste the TikTok video URL"}],
          "methods": ["GET"], "provider": "TEDDY-TECH", "verified": true,
          "upstreamPath": "/downloader/tiktok"
        }
      },
      {
        "Instagram Downloader": {
          "desc": "Download media from an Instagram post or reel URL.",
          "path": "/api/teddyai/downloader/instagram?url=",
          "params": [{"name": "url", "required": true, "description": "Paste the Instagram post or reel URL"}],
          "methods": ["GET"], "provider": "TEDDY-TECH", "verified": true,
          "upstreamPath": "/downloader/instagram"
        }
      }
    ]
  }
];
