'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) => merge(common, {
  entry: {
    background: PATHS.src + '/background.js',
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  node: {
    fs: 'empty'
  },
});

module.exports = config;
