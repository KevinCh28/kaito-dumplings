/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://kaito-five.vercel.app/api/:slug*'
      },
    ]
  },
}

module.exports = nextConfig;