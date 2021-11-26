const path = require('path');
const config = require('./config.js');

const aliasPlugin = require('@rollup/plugin-alias');
const replacePlugin = require('@rollup/plugin-replace');
const deletePlugin = require('rollup-plugin-delete');
const progressPlugin = require('rollup-plugin-progress');

const devServerPlugin = require('rollup-plugin-dev');

const typescriptPlugin = require('rollup-plugin-typescript2');

const paths = {
	src: path.resolve(config.ROOT_PATH, 'src'),
	out: path.resolve(config.ROOT_PATH, 'out'),
	cache: path.resolve(config.ROOT_PATH, 'node_modules/.cache/bundlerCache'),

	eslintConfig: path.resolve(config.ROOT_PATH, '.eslintrc.js'),
	tsConfig: path.resolve(config.ROOT_PATH, 'tsconfig.json'),
};

const options = {};
options.ts = {
	tsconfig: paths.tsConfig,
	tsconfigDefaults: {
		exclude: ['./src/**/*.test.ts', './src/**/*.stories.ts'],
	},
};

const aliases = require(path.resolve(config.CONFIG_PATH, 'alias.json'));
for (const key in aliases) aliases[key] = path.resolve(config.ROOT_PATH, aliases[key]);

/** @type {import('rollup').RollupOptions} */
const rollup = {
	input: path.resolve(paths.src, 'index.ts'),
	output: {
		dir: paths.out,
		format: 'esm',
		sourcemap: true,
	},
	plugins: [
		aliasPlugin(aliases),
		replacePlugin({
			values: {
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				__IS_PRODUCTION__: JSON.stringify(config.IS_PRODUCTION),
			},
			preventAssignment: false,
		}),
		progressPlugin(),
		deletePlugin({ targets: `${paths.out}/*` }),

		typescriptPlugin(options.ts),
	],
};

if (config.IS_WATCH) {
	rollup.plugins.push(
		devServerPlugin({
			silent: true,
			port: 8081,
			host: config.ENV.HOST,
			dirs: [paths.out],
		}),
	);
}

module.exports = {
	rollup,
	paths,
};
