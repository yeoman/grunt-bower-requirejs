'use strict';
module.exports = function (grunt) {

  grunt.registerMultiTask('bower', 'Wire-up Bower components in RJS config', function () {
    var cb = this.async();
    var bowerRequireJS = require('bower-requirejs');
    var options = this.options({
      config: this.data.rjsConfig,
      exclude: [],
      baseUrl: '',
      transitive: false
    });

    bowerRequireJS(options, cb);
  });
};
