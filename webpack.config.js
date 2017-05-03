"use strict";

const webpack = require('webpack');
const path = require('path');

const TYPE_MAP = {
	development: ['d', 'development'],
	product: ['p', 'product']
};

const TYPES = Object.keys(TYPE_MAP);
const {
	length: COUNT
} = TYPES;

const TYPE = process.argv.reduce((type, arg) => {
	for (let i = 0; i < COUNT; ++i) {
		const testType = TYPES[i];

		const [short, long] = TYPE_MAP[testType];

		if (arg === `-${short}` || arg === `--${long}`)
			return testType;
	}

	return type;
}, TYPES[0]);

const DEV = TYPE === "development";
const PRODUCT = TYPE === "product";

const plugins = [
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			DEV: JSON.stringify(DEV),
			PRODUCT: JSON.stringify(PRODUCT)
		}
	})
];

const productPlugins = [
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true,
			unsafe: true
		}
	})
];

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: DEV ? 'index_dev' : 'index',

	noInfo: true,

	target: 'node',

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, PRODUCT ? 'dist' : 'dev'),
		library: 'reactAppCarcass',
		libraryTarget: PRODUCT ? 'umd' : 'var'
	},

	watch: DEV,

	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: DEV ? "cheap-source-map" : null,

	plugins: PRODUCT ? plugins.concat(productPlugins) : plugins,

	resolve: {
		modulesDirectories: ['node_modules', 'src'],
		extensions: ['', '.js', '.jsx']
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [{
			exclude: /node_modules/,
			test: /\.jsx?$/,
			loader: 'babel'
		}],
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}]
	}
}