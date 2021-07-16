/* eslint-disable max-lines */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require, global-require, @scandipwa/scandipwa-guidelines/export-level-one */

const {
    createWebpackDevConfig,
    createWebpackProdConfig
} = require('@tilework/mosaic-craco');
const path = require('path');
const webpack = require('webpack');
const FallbackPlugin = require('@tilework/mosaic-webpack-fallback-plugin');
const { injectWebpackConfig, injectBabelConfig } = require('@tilework/mosaic-config-injectors');
const i18nPlugin = require('@scandipwa/webpack-i18n-runtime/build-config/config.plugin');

const { logger } = require('@storybook/node-logger');

const {
    resolve, relative, dirname, join
} = require('path');

const {
    mergePlugins
} = require('@storybook/preset-create-react-app/dist/helpers/mergePlugins');
const {
    processCraConfig
} = require('@storybook/preset-create-react-app/dist/helpers/processCraConfig');
const {
    getModulePath
} = require('@storybook/preset-create-react-app/dist/helpers/getModulePath');

const jsConfig = require(path.resolve('jsconfig.json'));


const cracoConfig = {
    reactScriptsVersion: 'react-scripts'
};

const babelDefault = (babelConfig, _storybookConfig) =>
    ({
        presets: [],
        plugins: [
            // ...babelConfig.plugins,
            require.resolve('babel-plugin-transform-rebem-jsx')
        ]
    });

const incompatiblePresets = [
    '@storybook/preset-scss',
    '@storybook/preset-typescript',
    '@storybook/preset-create-react-app'
];

const checkPresets = (options) => {
    const presetsList = options.presetsList || [];

    presetsList.forEach((preset) => {
        const presetName = typeof preset === 'string' ? preset : preset.name;
        if (incompatiblePresets.includes(presetName)) {
            logger.warn(
                `\`${presetName}\` may not be compatible with \`storybook-preset-craco\``
            );
        }
    });
};

const configureWebpack = (webpackConfig = {}, options) => {
    const createWebpackConfig = webpackConfig.mode === 'production'
        ? createWebpackProdConfig
        : createWebpackDevConfig;

    checkPresets(options);


    logger.info(
        `=> Loading Craco configuration`
    );

    const scriptsPackageName = cracoConfig.reactScriptsVersion || 'react-scripts';

    const scriptsPath = dirname(
        require.resolve(`${scriptsPackageName}/package.json`)
    );

    logger.info(`=> Using react-scripts from \`${relative(process.cwd(), scriptsPath)}\``);

    const cracoWebpackConfig = createWebpackConfig(cracoConfig);

    const resolveLoader = {
        modules: ['node_modules', join(scriptsPath, 'node_modules')]
    };

    // Remove existing rules related to JavaScript and TypeScript.
    logger.info('=> Removing existing JavaScript and TypeScript rules.');
    const filteredRules = webpackConfig.module
    && webpackConfig.module.rules.filter(
        ({ test }) => !(
            test instanceof RegExp
          && ((test && test.test('.js')) || test.test('.ts'))
        )
    );

    // Select the relevent craco rules and add the Storybook config directory.
    logger.info('=> Modifying craco rules.');

    const craRules = processCraConfig(cracoWebpackConfig, options);

    // CRA uses the `ModuleScopePlugin` to limit suppot to the `src` directory.
    // Here, we select the plugin and modify its configuration to include Storybook config directory.
    const plugins = cracoWebpackConfig.resolve.plugins.map((plugin) => {
        if (plugin.appSrcs) {
            // Mutate the plugin directly as opposed to recreating it.
            // eslint-disable-next-line no-param-reassign
            plugin.appSrcs = [...plugin.appSrcs, resolve(options.configDir)];
        }

        return plugin;
    });

    // Return the new config.
    return {
        ...webpackConfig,
        module: {
            ...webpackConfig.module,
            rules: [...(filteredRules || []), ...craRules]
        },
        plugins: mergePlugins(
            ...(webpackConfig.plugins || []),
            ...cracoWebpackConfig.plugins
        ),
        resolve: {
            ...webpackConfig.resolve,
            alias: { ...webpackConfig.resolve.alias, ...cracoWebpackConfig.resolve.alias },
            extensions: cracoWebpackConfig.resolve.extensions,
            modules: [
                ...((webpackConfig.resolve && webpackConfig.resolve.modules) || []),
                ...((cracoWebpackConfig.resolve && cracoWebpackConfig.resolve.modules) || []),
                join(scriptsPath, 'node_modules'),
                ...getModulePath(process.cwd())
            ],
            plugins
        },
        resolveLoader
    };
};

const sanitizeAlias = (str) => str.replace(/\/\*$/i, '');
const addAliases = (webpackConfig) => {
    const projectAliases = Object.entries(jsConfig.compilerOptions.paths)
        .reduce((acc, [aliasName, aliasPaths]) => ({
            ...acc,
            [sanitizeAlias(aliasName)]: path.resolve(sanitizeAlias(aliasPaths[0]))
        }), {});

    webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        ...projectAliases
    };
}

const webpackFinal = (webpackConfig = {}) => {
    // logger.info('=> Removing storybook default rules.');

    // these are suppreseed by storybook when @storybook/preset-create-react-app is present.
    // webpackConfig.module.rules = webpackConfig.module.rules.filter(
    //     (rule) => !(
    //         rule.test instanceof RegExp
    //     && (rule.test.test('.css')
    //       || rule.test.test('.svg')
    //       || rule.test.test('.mp4'))
    //     )
    // );

    injectWebpackConfig(webpackConfig, { webpack: webpack, shouldApplyPlugins: false });
    i18nPlugin.plugin.overrideWebpackConfig({ webpackConfig });
    addAliases(webpackConfig)

    // Allow importing .style, .ts and .tsx files without specifying the extension
    webpackConfig.resolve.extensions.push('.scss', '.ts', '.tsx');

    webpackConfig.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
            plugin.options.ignoreOrder = true;
        }
    });

    const rule = webpackConfig.module.rules.find((r) => r.oneOf);
    if (rule.oneOf) {
        const sassRule = rule.oneOf.find((one) => one.test && !Array.isArray(one.test) && one.test.test('file.scss'));
        if (sassRule) {
            sassRule.use.push({
                loader: 'sass-resources-loader',
                options: {
                    resources: FallbackPlugin.getFallbackPathname('src/style/abstract/_abstract.scss')
                }
            });
        }
    }

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('_'),
                REBEM_ELEM_DELIM: JSON.stringify('-'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    );

    return webpackConfig;
};

const managerWebpack = (webpackConfig = {}, options) => {
    const scriptsPackageName = cracoConfig.reactScriptsVersion || 'react-scripts';

    const scriptsPath = dirname(
        require.resolve(`${scriptsPackageName}/package.json`)
    );

    const resolveLoader = {
        modules: ['node_modules', join(scriptsPath, 'node_modules')]
    };

    // webpackConfig.module.rules.forEach(
    //     (rule) => {
    //         if (rule.test && !Array.isArray(rule.test) && (rule.test.test('file.tsx') || rule.test.test('file.js'))) {
    //             rule.use.find(
    //                 (u) => u.loader.includes('babel-loader')
    //             )
    //                 .options
    //                 .plugins
    //                 .unshift(require.resolve('babel-plugin-transform-rebem-jsx'));
    //         }
    //     }
    // );

    // webpackConfig.plugins.push(
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             REBEM_MOD_DELIM: JSON.stringify('_'),
    //             REBEM_ELEM_DELIM: JSON.stringify('-'),
    //             NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    //         }
    //     })
    // );

    return {
        ...webpackConfig,
        resolveLoader
    };
};

module.exports = {
    babelDefault,
    babel: (babelConfig) => injectBabelConfig(babelConfig),
    webpack: configureWebpack,
    webpackFinal,

    managerWebpack
};
