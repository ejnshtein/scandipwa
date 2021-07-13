// const path = require('path');
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

// const { findArgsFromCli } = require("@tilework/mosaic-craco/lib/args");

// // Make sure this is called before "paths" is imported.
// findArgsFromCli();

// const { log } = require("@tilework/mosaic-craco/lib/logger");
// const { getCraPaths, start } = require("@tilework/mosaic-craco/lib/cra");
// const { loadCracoConfigAsync } = require("@tilework/mosaic-craco/lib/config");
// const { overrideWebpackDev } = require("@tilework/mosaic-craco/lib/features/webpack/override");
// const { overrideDevServer } = require("@tilework/mosaic-craco/lib/features/dev-server/override");
// const { overrideCraPaths } = require("@tilework/mosaic-craco/lib/features/cra-paths/override");
// const { validateCraVersion } = require("@tilework/mosaic-craco/lib/validate-cra-version");

// log("Override started with arguments: ", process.argv);
// log("For environment: ", process.env.NODE_ENV);

// const context = {
//     env: process.env.NODE_ENV
// };

const cracoConfig =  {}; //require("@tilework/mosaic-cra-scripts/craco.config")()


// const cracoConfig = require("@tilework/mosaic-cra-scripts/craco.config")()

// module.exports = async () => {
//     const cracoConfig = await loadCracoConfigAsync(context)
//     validateCraVersion(cracoConfig);

//     context.paths = getCraPaths(cracoConfig);
//     overrideCraPaths(cracoConfig, context);
//     overrideWebpackDev(cracoConfig, context);
//     return cracoConfig
// }

// cracoConfig.reactScriptsVersion = 'react-scripts'

// overrideDevServer(cracoConfig, context);
cracoConfig.reactScriptsVersion = 'react-scripts'

module.exports = cracoConfig
