/** @type {import('next').NextConfig} */

// const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/id/**',
      },
    ],
  },
  // NOTE: If we want Sass Support
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    domains: [ 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
