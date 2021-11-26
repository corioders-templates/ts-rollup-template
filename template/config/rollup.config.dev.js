const config = require('./config');
if (config.IS_PRODUCTION) console.warn('Waring: using development config in production env');

const common = require('./rollup.config.common.js');

/** @type {import('rollup').RollupOptions}*/
const rollupConfig = {
	...common.rollup,
};

module.exports = rollupConfig;
