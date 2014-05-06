'use strict';
var bowerRequireJS = require('bower-requirejs');

module.exports = function (grunt) {
  grunt.registerMultiTask('bower', 'Wire-up Bower components in RJS config', function () {
    bowerRequireJS(this.options({
      config: this.data.rjsConfig,
      exclude: [],
      baseUrl: '',
      transitive: false
    }), this.async());
  });
};
