const path = require('path')
const webpack = require('webpack')
const { injectWebpackConfig } = require('@tilework/mosaic-config-injectors');

const jsConfig = require('../jsconfig.json')

module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "storybook-preset-mosaic-craco",
      options: {
        cracoConfigFile: path.join(__dirname, 'craco.config.js')
      }
    }
  ],
  webpackFinal: (webpackConfig) => {
    const sanitize = (str) => str.replace(/\/\*$/i, '')

    const projectAliases = Object.entries(jsConfig.compilerOptions.paths)
      .reduce((acc, [aliasName, aliasPaths]) => ({
        ...acc,
        [sanitize(aliasName)]: path.resolve(sanitize(aliasPaths[0]))
      }), {})

    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...projectAliases
    }

    // Allow importing .style, .ts and .tsx files without specifying the extension
    webpackConfig.resolve.extensions.push('.scss', '.ts', '.tsx');

    webpackConfig.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
            plugin.options.ignoreOrder = true;
        }
    })

    return webpackConfig
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}