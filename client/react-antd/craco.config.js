/* eslint-disable */
const cracoAlias = require('craco-alias');
const cracoLess = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
    {
      plugin: cracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#000000',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
