'use strict';
var bowerRequireJS = require('bower-requirejs');
var loadGruntTasks = require('load-grunt-tasks');

function task() {
  var options = this.options({
    config: this.data.rjsConfig,
    exclude: [],
    baseUrl: '',
    transitive: false,
    excludeDev: false
  });

  options['exclude-dev'] = options.excludeDev;

  bowerRequireJS(options, this.async());
}

module.exports = function (grunt) {
  // make sure conflicting grunt tasks are loaded before registering tasks
  loadGruntTasks(grunt, {pattern: ['grunt-bower*', '!grunt-bower-requirejs'] });

  // only register bower task if it's not already registered by another plugin
  if (!grunt.task.exists('bower')) {
    grunt.registerMultiTask('bower', 'Wire-up Bower components in RJS config', function () {
      grunt.log.warn('The task "bower" is deprecated for this module. Use "bowerRequirejs" instead');
      task.call(this);
    });
  }

  grunt.registerMultiTask('bowerRequirejs', 'Wire-up Bower components in RJS config', task);
};
