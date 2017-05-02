'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	resolve: {
		modulesDirectories: ['__tests__', 'node_modules', 'src'],
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
		}]
	}
};
