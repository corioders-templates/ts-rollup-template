const config = require('./config');
if (!config.IS_PRODUCTION) console.warn('Waring: using production config not in production env');

const common = require('./rollup.config.common.js');

/** @type {import('rollup').RollupOptions}*/
const rollupConfig = {
	...common.rollup,
};

let outputArray = rollupConfig.output;
if (!Array.isArray(outputArray)) outputArray = [outputArray];
for (const output of outputArray) {
	output.sourcemap = false;
}

module.exports = rollupConfig;
