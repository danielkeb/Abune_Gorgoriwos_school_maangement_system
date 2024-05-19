/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// next.config.js
// next.config.js

module.exports = {
  jsx: {
    throwIfNamespace: false,
  },
};
// next.config.js
module.exports = {
  presets: [
    ['@babel/preset-react', {
      runtime: 'automatic',
      importSource: 'react',
      throwIfNamespace: false, // Add this line
    }],
  ],
};
module.exports = {
  reactJsx: {
    throwIfNamespace: false,
  },
};


module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'file-loader',
      });
      return config;
    },
  };
  