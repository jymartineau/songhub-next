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
    domains: [ 'lh3.googleusercontent.com', 'picsum.photos', "freepd.com", "ui-avatars.com"]
  },
  // NOTE: If we want Sass Support
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },

}

module.exports = nextConfig
