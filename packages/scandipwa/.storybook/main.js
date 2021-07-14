const path = require('path')
const webpack = require('webpack')
const FallbackPlugin = require('@tilework/mosaic-webpack-fallback-plugin');
const { injectWebpackConfig, injectBabelConfig } = require('@tilework/mosaic-config-injectors')
const i18nPlugin = require('@scandipwa/webpack-i18n-runtime/build-config/config.plugin')

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
  babel: (babelConfig) => {
    // babelConfig.presets.push(
    //   [
    //       require.resolve('babel-preset-react-app'),
    //       {
    //           // for some reason only classic works
    //           // the "automatic" does not work
    //           runtime: 'classic'
    //       }
    //   ]
    // )
    babelConfig.plugins.unshift('transform-rebem-jsx')
    return babelConfig
  },
  webpackFinal: (webpackConfig) => {
    injectWebpackConfig(webpackConfig, { webpack })
    i18nPlugin.plugin.overrideWebpackConfig({ webpackConfig })
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

    const rule =  webpackConfig.module.rules.find(r => r.oneOf)
    if (rule.oneOf) {
      const sassRule = rule.oneOf.find(one => one.test && !Array.isArray(one.test) && one.test.test('file.scss'))
      if (sassRule) {
        sassRule.use.push({
          loader: 'sass-resources-loader',
          options: {
            resources: FallbackPlugin.getFallbackPathname('src/style/abstract/_abstract.scss')
          }
        })
      }
    }

    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
          'process.env': {
              REBEM_MOD_DELIM: JSON.stringify('_'),
              REBEM_ELEM_DELIM: JSON.stringify('-')
          }
      })
    )

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