const axios = require("axios");
const micro = require("micro");
const microCors = require("micro-cors");
const { parse } = require("url");
const cors = microCors({allowHeaders: ['X-Requested-With','Access-Control-Allow-Origin','X-HTTP-Method-Override','Content-Type','Authorization','Accept', 'pragma', 'Expires']});

const handler = async (req, res) => {
  const { query } = parse(req.url, true);
  const { url: encodedUrl } = query;

  if (!encodedUrl) {
    return micro.send(res, 400, { error: "Missing URL parameter" });
  }

  const url = decodeURIComponent(encodedUrl);

  if (!url) {
    return micro.send(res, 400, { error: "Missing URL parameter" });
  }

  if (!url.startsWith("https://cc.bingj.com/") && !url.startsWith("https://bing.com/")) {
    return micro.send(res, 400, { error: "Invalid URL" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "x-requested-with": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36",
      },
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    micro.send(res, response.status, response.data);
  } catch (error) {
    console.error("Error fetching URL:", error.message, error.config);
    micro.send(res, 500, {
      error: "Failed to fetch the requested URL",
      errorMessage: error.message,
    });
  }
};

module.exports = cors(handler);
