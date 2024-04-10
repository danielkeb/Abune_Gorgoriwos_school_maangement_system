/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// next.config.js

module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'file-loader',
      });
      return config;
    },
  };
  