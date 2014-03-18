/*
 * grunt-not-constantinople
 * https://github.com/traviswimer/grunt-not-constantinople
 *
 * Copyright (c) 2014 Travis Wimer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    not_constantinople: {
      default_options: {
        options: {
          unitTestTask: "nodeunit:not_constantinople"
        }
      },
      custom_options: {
        options: {
          directories: {
            root: 'custom_test',
            coverage: 'cov',
            sourceFiles: 'app'
          },
          thresholds: {
            'statements': 50,
            'branches': 50,
            'lines': 50,
            'functions': 50
          },
          report: {
            type: 'text',
            print: 'detail'
          },
          cleanup: false,
          unitTestTask: "nodeunit:not_constantinople"
        }
      },
    },

    // Unit tests.
    nodeunit: {
      options: {
        reporter: "spec"
      },
      tests: ['test/*_test.js'],
      not_constantinople: ['mock_test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'not_constantinople', 'nodeunit:tests']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
