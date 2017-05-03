// Karma configuration
// Generated on Wed May 03 2017 00:11:19 GMT+0300 (MSK)
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var path = require('path');

module.exports = function(config) {

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'es6-shim'],

    // list of files / patterns to load in the browser
    files: [
      '__tests__/**/*.js',
      '__tests__/**/*.jsx'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '__tests__/**/*.js': ['webpack'],
        '__tests__/**/*.jsx': ['webpack']
    },

    webpack: {
      module: webpackConfig.module,
      postLoaders: [{
        test: /\.(jsx?)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'sourcemap-istanbul-instrumenter-loader?force-sourcemap=true'
      }],
      resolve: webpackConfig.resolve,
    },

    webpackServer: {
      noInfo: true
    },

    remapIstanbulReporter: {
      reports: {
        html: 'coverage/html',
        'text-summary': null,
        lcovonly: 'coverage/lcov-report/lcov.info'
      },
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'karma-remap-istanbul'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['PhantomJS2'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

  })
};
