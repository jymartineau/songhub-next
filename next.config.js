/** @type {import('next').NextConfig} */

// const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  // NOTE: If we want Sass Support
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  images: {
    domains: [ 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
