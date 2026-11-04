'use strict';

// TEDDY-TECH public catalogue. Every entry is proxied to the live Shizo route used by /api/teddyai/ai/gpt.
module.exports = [
  {
    "name": "TEDDY · AI",
    "items": [
      {
        "ChatGPT": {
          "desc": "Chat with GPT. Send prompt (also accepts query). Same live route as /api/teddyai/ai/gpt.",
          "path": "/api/teddyai/ai/chatgpt?prompt=",
          "params": [
            {
              "name": "prompt",
              "required": true,
              "description": "Message for ChatGPT"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Dall E Imagine": {
          "desc": "Generate an image with Dall-E realism. Returns an image.",
          "path": "/api/teddyai/ai/dall-e-imagine",
          "params": [
            {
              "name": "prompt",
              "required": true,
              "description": "Describe the image"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "AI Image Upscaler": {
          "desc": "Upscale an image. Pass a direct image URL.",
          "path": "/api/teddyai/ai/ai-image-upscaler",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Direct image URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "AI Image Enhancer": {
          "desc": "Enhance an image. Pass a direct image URL.",
          "path": "/api/teddyai/ai/ai-image-enhancer",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Direct image URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "AI Image Sharpener": {
          "desc": "Sharpen an image. Pass a direct image URL.",
          "path": "/api/teddyai/ai/ai-image-sharpener",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Direct image URL"
            }
          ],
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
          "desc": "Premium card game. The free Shizo key is rejected here; a paid key is required upstream.",
          "path": "/api/teddyai/games/cards-premium",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Guess App Name": {
          "desc": "Guess the app name. Returns a question and answer as JSON.",
          "path": "/api/teddyai/games/guess-app-name",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Guess Song Lyrics": {
          "desc": "Guess the song lyric. Returns a question and answer as JSON.",
          "path": "/api/teddyai/games/guess-song-lyrics",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Guess The Words": {
          "desc": "Guess the word from clues. Returns a question and answer as JSON.",
          "path": "/api/teddyai/games/guess-the-words",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Emoji Riddles": {
          "desc": "Emoji riddle. Returns a question and answer as JSON.",
          "path": "/api/teddyai/games/emoji-riddles",
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
    "name": "TEDDY · Fanart",
    "items": [
      {
        "Annie": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/annie",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Mikasa": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/mikasa",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Nami": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/nami",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Sakura": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/sakura",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Sasha": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/sasha",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Vivi": {
          "desc": "Random fanart image.",
          "path": "/api/teddyai/fanart/vivi",
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
    "name": "TEDDY · SFW",
    "items": [
      {
        "Husby": {
          "desc": "Random SFW character image.",
          "path": "/api/teddyai/sfw/husby",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Loli": {
          "desc": "Random SFW character image.",
          "path": "/api/teddyai/sfw/loli",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Neko": {
          "desc": "Random SFW character image.",
          "path": "/api/teddyai/sfw/neko",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Shota": {
          "desc": "Random SFW character image.",
          "path": "/api/teddyai/sfw/shota",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Waifu": {
          "desc": "Random SFW character image.",
          "path": "/api/teddyai/sfw/waifu",
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
    "name": "TEDDY · Pies",
    "items": [
      {
        "Indian Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/indian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "China Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/china-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Indonesian Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/indonesian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Japanese Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/japanese-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Korean Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/korean-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Malaysian Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/malaysian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Thailand Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/thailand-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Vietnamese Pies": {
          "desc": "Random image from this set.",
          "path": "/api/teddyai/pies/vietnamese-pies",
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
    "name": "TEDDY · Quote",
    "items": [
      {
        "Motivational Quotes": {
          "desc": "Random motivational quote as JSON.",
          "path": "/api/teddyai/quote/motivational-quotes",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Truth (Question)": {
          "desc": "Random truth question as JSON.",
          "path": "/api/teddyai/quote/truth-question",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Dare (Task)": {
          "desc": "Random dare as JSON.",
          "path": "/api/teddyai/quote/dare-task",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Flirts (English)": {
          "desc": "English flirt line. Upstream currently returns an internal error on the free key.",
          "path": "/api/teddyai/quote/flirts-english",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Flirts (Hindi)": {
          "desc": "Hindi flirt line as JSON.",
          "path": "/api/teddyai/quote/flirts-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Shayari (Hindi)": {
          "desc": "Hindi shayari as JSON.",
          "path": "/api/teddyai/quote/shayari-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Sweet Night Texts": {
          "desc": "Sweet good-night text as JSON.",
          "path": "/api/teddyai/quote/sweet-night-texts",
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
    "name": "TEDDY · Tools",
    "items": [
      {
        "S Links (Shizo URL)": {
          "desc": "Shorten a URL with S-Links.",
          "path": "/api/teddyai/tools/s-links-shizo-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Long URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Bit.ly Short URL": {
          "desc": "Shorten a URL with Bitly.",
          "path": "/api/teddyai/tools/bit-ly-short-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Long URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Tiny Short URL": {
          "desc": "Shorten a URL with TinyURL.",
          "path": "/api/teddyai/tools/tiny-short-url",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Long URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Screenshot Website": {
          "desc": "Screenshot a website. Returns an image.",
          "path": "/api/teddyai/tools/screenshot-website",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Website URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Remove Background": {
          "desc": "Remove an image background. Pass a direct image URL.",
          "path": "/api/teddyai/tools/remove-background",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Direct image URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Search Meme": {
          "desc": "Search for a meme image. Upstream sometimes errors on the free key.",
          "path": "/api/teddyai/tools/search-meme",
          "params": [
            {
              "name": "query",
              "required": true,
              "description": "Search term"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Forex Exchange": {
          "desc": "Convert currency. Upstream conversion is currently failing; amount, from and to are forwarded.",
          "path": "/api/teddyai/tools/forex-exchange",
          "params": [
            {
              "name": "amount",
              "required": true,
              "description": "Amount to convert"
            },
            {
              "name": "from",
              "required": false,
              "description": "Source currency, e.g. USD"
            },
            {
              "name": "to",
              "required": false,
              "description": "Target currency, e.g. KES"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "IP Information": {
          "desc": "Look up an IP address.",
          "path": "/api/teddyai/tools/ip-information",
          "params": [
            {
              "name": "ip",
              "required": true,
              "description": "IPv4 address"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Weather Info": {
          "desc": "Current weather for a city.",
          "path": "/api/teddyai/tools/weather-info",
          "params": [
            {
              "name": "city",
              "required": true,
              "description": "City name"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Domain WhoIs": {
          "desc": "WHOIS lookup for a domain.",
          "path": "/api/teddyai/tools/domain-whois",
          "params": [
            {
              "name": "domain",
              "required": true,
              "description": "Domain, e.g. google.com"
            }
          ],
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
    "name": "TEDDY · Downloader",
    "items": [
      {
        "Facebook Downloader": {
          "desc": "Download a Facebook video.",
          "path": "/api/teddyai/downloader/facebook-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Facebook video or reel URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Instagram Downloader": {
          "desc": "Download an Instagram post or reel.",
          "path": "/api/teddyai/downloader/instagram-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Instagram URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "TikTok Downloader": {
          "desc": "Download a TikTok video.",
          "path": "/api/teddyai/downloader/tiktok-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "TikTok URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Twitter/X Downloader": {
          "desc": "Download a Twitter / X video.",
          "path": "/api/teddyai/downloader/twitter-x-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Tweet URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "YouTube Downloader": {
          "desc": "Download a YouTube video.",
          "path": "/api/teddyai/downloader/youtube-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "YouTube URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      },
      {
        "Universal Downloader": {
          "desc": "Download media from a supported social URL.",
          "path": "/api/teddyai/downloader/universal-downloader",
          "params": [
            {
              "name": "url",
              "required": true,
              "description": "Media URL"
            }
          ],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": true
        }
      }
    ]
  }
];
