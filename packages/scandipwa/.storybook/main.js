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
    // "@storybook/preset-scss",
    {
      name: "storybook-preset-mosaic-craco",
      options: {
        cracoConfigFile: path.join(__dirname, 'craco.config.js')
      }
    }
  ],
  webpackFinal: (webpackConfig) => {
    // const injectedConfig = injectWebpackConfig(config, { webpack })

    // return config

    // const jsRules = webpackConfig.module.rules.filter(rule => rule.test && !Array.isArray(rule.test) && rule.test.test('file.js'))

    // for (const rule of jsRules) {
    //   for (const u of rule.use) {
    //     u.options = u.options || {}
    //     u.options.presets = u.options.presets || []
    //     const hasPresetReact = u.options.presets.some(preset => {
    //       const presetPath = Array.isArray(preset) ? preset[0]: preset

    //       return presetPath.includes('@babel/preset-react')
    //     })

    //     if (!hasPresetReact) {
    //       u.options.presets.push(require.resolve('@babel/preset-react'))
    //     }
    //   }
    // }

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

    // injectedConfig.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../'),
    // })

    return webpackConfig
  },
  // babel: (config) => {
  //   return {
  //     ...config
  //   }
  // },
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