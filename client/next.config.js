/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://kaitodumplings.com/api/:slug*'
      },
    ]
  },
}

module.exports = nextConfig;