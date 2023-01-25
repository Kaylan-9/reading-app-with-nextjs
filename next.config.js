/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
   domains: [
    'https://storage.cloud.google.com'
   ],
   remotePatterns: [
      {
        protocol: 'https',
        hostname: '/storage.cloud.google.com',
        pathname: '/xyz2-book-page-image-data/**',
      },
    ]
  },
}

module.exports = nextConfig
