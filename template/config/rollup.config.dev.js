const config = require('./config');
if (config.IS_PRODUCTION) console.warn('Waring: using development config in production env');

const common = require('./rollup.config.common.js');

const htmlPlugin = require('@rollup/plugin-html');

/** @type {import('rollup').RollupOptions}*/
const rollupConfig = {
	...common.rollupConfig,
	plugins: [...common.rollupConfig.plugins, htmlPlugin()],
};

module.exports = rollupConfig;
