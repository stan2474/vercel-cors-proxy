const axios = require('axios');
const micro = require('micro');
const microCors = require('micro-cors');
const { parse } = require('url');
const cors = microCors();

const handler = async (req, res) => {
  const { query } = parse(req.url, true);
  const { url: encodedUrl } = query;

  if (!encodedUrl) {
    return micro.send(res, 400, { error: 'Missing URL parameter' });
  }

  const url = decodeURIComponent(encodedUrl);

  if (!url) {
    return micro.send(res, 400, { error: 'Missing URL parameter' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    micro.send(res, response.status, response.data);
  } catch (error) {
    console.error('Error fetching URL:', error.message, error.config);
    micro.send(res, 500, {
      error: 'Failed to fetch the requested URL',
      errorMessage: error.message,
    });
  }
};

module.exports = cors(handler);
