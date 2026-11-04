'use strict';

// User-confirmed TEDDY-TECH display catalogue. Route slugs are provisional until Shizo publishes route metadata.
module.exports = [
  {
    "name": "TEDDY · AI",
    "items": [
      {
        "ChatGPT": {
          "desc": "Send a prompt to ChatGPT and receive a JSON response. Enter your prompt in the Test Endpoint form.",
          "path": "/api/teddyai/ai/chatgpt?prompt=",
          "params": [{"name":"prompt","required":true,"description":"Enter the message you want ChatGPT to answer"}],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Dall E Imagine": {
          "desc": "TEDDY-TECH AI endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/ai/dall-e-imagine",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "AI Image Upscaler": {
          "desc": "TEDDY-TECH AI endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/ai/ai-image-upscaler",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "AI Image Enhancer": {
          "desc": "TEDDY-TECH AI endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/ai/ai-image-enhancer",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "AI Image Sharpener": {
          "desc": "TEDDY-TECH AI endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/ai/ai-image-sharpener",
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
    "name": "TEDDY · Games",
    "items": [
      {
        "Cards (premium)": {
          "desc": "TEDDY-TECH Games endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/games/cards-premium",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Guess App Name": {
          "desc": "TEDDY-TECH Games endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/games/guess-app-name",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Guess Song Lyrics": {
          "desc": "TEDDY-TECH Games endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/games/guess-song-lyrics",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Guess The Words": {
          "desc": "TEDDY-TECH Games endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/games/guess-the-words",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Emoji Riddles": {
          "desc": "TEDDY-TECH Games endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/games/emoji-riddles",
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
    "name": "TEDDY · Fanart",
    "items": [
      {
        "Annie": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/annie",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Mikasa": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/mikasa",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Nami": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/nami",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Sakura": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/sakura",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Sasha": {
          "desc": "TEDDY-TECH Fanart endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/fanart/sasha",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
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
        "Husby": {
          "desc": "TEDDY-TECH SFW endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/sfw/husby",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Loli": {
          "desc": "TEDDY-TECH SFW endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/sfw/loli",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Neko": {
          "desc": "TEDDY-TECH SFW endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/sfw/neko",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Shota": {
          "desc": "TEDDY-TECH SFW endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/sfw/shota",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Waifu": {
          "desc": "TEDDY-TECH SFW endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/sfw/waifu",
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
        "Japanese Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/japanese-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Korean Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/korean-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Malaysian Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/malaysian-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Thailand Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/thailand-pies",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Vietnamese Pies": {
          "desc": "TEDDY-TECH Pies endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/pies/vietnamese-pies",
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
    "name": "TEDDY · Quote",
    "items": [
      {
        "Motivational Quotes": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/motivational-quotes",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Truth (Question)": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/truth-question",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Dare (Task)": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/dare-task",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Flirts (English)": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/flirts-english",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Flirts (Hindi)": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/flirts-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Shayari (Hindi)": {
          "desc": "TEDDY-TECH Quote endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/quote/shayari-hindi",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
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
          "params": [],
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
          "params": [],
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
          "params": [],
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
          "params": [],
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
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Search Meme": {
          "desc": "TEDDY-TECH Tools endpoint · IMG. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/search-meme",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Forex Exchange": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/forex-exchange",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "IP Information": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/ip-information",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Weather Info": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/weather-info",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Domain WhoIs": {
          "desc": "TEDDY-TECH Tools endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/tools/domain-whois",
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
    "name": "TEDDY · Downloader",
    "items": [
      {
        "Facebook Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/facebook-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Instagram Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/instagram-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "TikTok Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/tiktok-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Twitter/X Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/twitter-x-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "YouTube Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/youtube-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      },
      {
        "Universal Downloader": {
          "desc": "TEDDY-TECH Downloader endpoint · JSON. Route and parameters require upstream verification.",
          "path": "/api/teddyai/downloader/universal-downloader",
          "params": [],
          "methods": [
            "GET"
          ],
          "provider": "TEDDY-TECH",
          "verified": false
        }
      }
    ]
  }
];
