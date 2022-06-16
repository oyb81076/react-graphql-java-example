/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { override, addBabelPlugins, overrideDevServer } = require('customize-cra');

module.exports = {
  webpack: override(addBabelPlugins('relay', '@emotion')),
  devServer: overrideDevServer((config) => ({
    ...config,
    proxy: {
      '/graphql': 'http://127.0.0.1:8080',
    },
  })),
};
