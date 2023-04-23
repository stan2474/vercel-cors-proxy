# Vercel CORS Proxy

A serverless CORS proxy built on Vercel using Node.js, Axios, and Micro for bypassing Cross-Origin Resource Sharing (CORS) restrictions. Ideal for hobby projects and proof-of-concept implementations.

**Deployed URL:** [https://vercel-cors-proxy-nine.vercel.app/](https://vercel-cors-proxy-nine.vercel.app/)

## ⚠️ Disclaimer

This proxy is deployed using Vercel's free plan, which comes with limitations. It is suitable for hobby projects and testing purposes. For production use or high-traffic applications, consider deploying it under a paid plan or hosting it yourself.

## Features

- Serverless function deployed on Vercel
- Easy to set up and use
- Uses Axios for making requests
- CORS support with micro-cors

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/vercel-cors-proxy.git
```

2. Change to the project directory:

```bash
cd vercel-cors-proxy
```

3. Install dependencies:

```bash
npm install
```

## Deployment

1. Set up Vercel CLI:

   - Install Vercel CLI globally:

   ```bash
   npm install -g vercel
   ```

   - If you haven't already, sign up for a free Vercel account and log in to the CLI:

   ```bash
   vercel login
   ```

2. Deploy the serverless function:

```bash
vercel --prod
```

## Usage

After deployment, you can use the deployed serverless function to proxy requests to other URLs, bypassing CORS restrictions.

The serverless function accepts a single query parameter `url` which should be an encoded URL.

### Example:

1. Create an encoded URL using `encodeURIComponent()` in JavaScript:

```javascript
const targetURL = 'https://www.example.com/api/endpoint';
const encodedURL = encodeURIComponent(targetURL);
```

2. Send a request to the deployed serverless function:

```javascript
const corsProxyURL = 'https://vercel-cors-proxy-nine.vercel.app/api?url=';
const response = await fetch(corsProxyURL + encodedURL);
```

3. Handle the response as needed:

```javascript
if (response.ok) {
  const data = await response.text(); // or use response.json() if the response is JSON
  // Process the data
} else {
  console.error(`Error fetching data: ${response.status}`);
}
```

With these steps, you can send requests through the serverless Vercel function to bypass CORS restrictions and access the data from the target URL.

## License

[MIT](LICENSE)

---

Make sure to update the repository URL and any other necessary details to match your own project. If
you'd like to include any additional information or instructions, feel free to modify the README as
needed.
