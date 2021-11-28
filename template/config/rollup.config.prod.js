const config = require('./config');
if (!config.IS_PRODUCTION) console.warn('Waring: using production config not in production env');

const common = require('./rollup.config.common.js');

const { terser: terserPlugin } = require('rollup-plugin-terser');

/** @type {import('rollup').RollupOptions}*/
const rollupConfig = {
	...common.rollupConfig,
	plugins: [...common.rollupConfig.plugins, terserPlugin()],
};

let outputArray = rollupConfig.output;
if (!Array.isArray(outputArray)) outputArray = [outputArray];
for (const output of outputArray) {
	output.sourcemap = false;
}

module.exports = rollupConfig;
