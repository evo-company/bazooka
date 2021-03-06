'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var EXAMPLES_BASE_DIR = path.join(__dirname, 'examples');

var getDirectories = function(srcPath) {
  return fs.readdirSync(srcPath).filter(function(file) {
    return fs.statSync(path.join(srcPath, file)).isDirectory();
  });
};

var makeFullPath = function(p) {
  return path.join(EXAMPLES_BASE_DIR, p)
};

var makeAppPath = function(dir) {
  return path.join(dir, 'app.js')
};

var examplesNames = getDirectories(EXAMPLES_BASE_DIR);
var examplesPaths = _.map(examplesNames, makeFullPath);
var examplesAppPaths = _.map(examplesPaths, makeAppPath);

var entry = _.zipObject(examplesNames, examplesAppPaths);

var modulesDirectories = ['node_modules', 'src'];
modulesDirectories = modulesDirectories.concat(examplesPaths);


module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      bazooka: path.join(__dirname, 'src', 'main.js'),
    },
    modulesDirectories: modulesDirectories,
  },
};
