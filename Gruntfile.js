'use strict';
var fs = require('fs');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'bin/*.js',
        'test/**/*.js'
      ]
    },
    clean: {
      bower: 'bower_components',
      tmp: 'tmp'
    },
    copy: {
      test: {
        expand: true,
        cwd: 'test/fixtures',
        src: ['*.js', '!*-expected.js'],
        dest: 'tmp/'
      }
    },
    simplemocha: {
      options: {
        reporter: 'spec',
        timeout: '5000'
      },
      test: {
        src: ['test/*.js']
      }
    },
    bower: {
      options: {
        exclude: ['underscore']
      },
      standard: {
        rjsConfig: 'tmp/config.js'
      },
      mocktask1: {
        exclude: [/* this one should run inside the mocked bower task */]
      },
      mocktask2: {
        exclude: [/* this one should run inside the mocked bower task after loading the bower-requirejs task again */]
      }
    },
    bowerRequirejs: {
      options: {
        exclude: ['underscore']
      },
      pathless: {
        rjsConfig: 'tmp/pathless-config.js'
      },
      global: {
        rjsConfig: 'tmp/global-config.js'
      },
      baseurl: {
        options: {
          baseUrl: './'
        },
        rjsConfig: 'tmp/baseurl-config.js'
      },
      generated: {
        rjsConfig: 'tmp/generated-config.js'
      },
      transitive: {
        options: {
          transitive: true
        },
        rjsConfig: 'tmp/transitive-config.js'
      },
      'exclude-dev': {
        options: {
          'excludeDev': true
        },
        rjsConfig: 'tmp/exclude-dev-config.js'
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('mkdir', function (dir) {
    require('fs').mkdirSync(dir);
  });

  grunt.registerTask('bower-install', function () {
    var done = this.async();
    var spawn = require('child_process').spawn;
    var ls = spawn('bower', ['install']);

    ls.stdout.on('data', function (data) {
      grunt.log.write(data);
    });

    ls.stderr.on('data', function (data) {
      grunt.log.write(data);
    });

    ls.on('close', function (code) {
      grunt.log.writeln('child process exited with code ' + code);
      done();
    });
  });

  // mock conflicting bower task
  grunt.registerTask('mock-bower-task', function() {
    // register mock task
    grunt.registerMultiTask('bower', 'mocked conflicting task', function () {
      fs.writeFileSync('tmp/' + this.target,'Rename completed')
    });

    grunt.task.run(['bower:mocktask1']);

    // load tasks again -> bower task should still be the mocked one
    grunt.loadTasks('tasks');

    grunt.task.run(['bower:mocktask2']);
  });



  grunt.registerTask('test', [
    'clean',
    'mkdir:tmp',
    'copy',
    'bower-install',
    'bower:standard',
    'bowerRequirejs',
    'mock-bower-task',
    'simplemocha',
    'clean'
  ]);

  grunt.registerTask('default', ['test']);
};
