/*
 * grunt-not-constantinople
 * https://github.com/traviswimer/grunt-not-constantinople
 *
 * Copyright (c) 2014 Travis Wimer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('not_constantinople', 'Grunt task to easily add Istanbul code coverage using any unit-testing framework.', function() {


    var cleaner = require('grunt-contrib-clean');

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      directories: {
        root: 'test',
        coverage: 'coverage',
        sourceFiles: 'app'
      },
      thresholds: {
        'statements': 90,
        'branches': 90,
        'lines': 90,
        'functions': 90
      },
      report: {
        type: 'lcov',
        print: 'detail'
      },
      cleanup: true,
      unitTestTask: false
    });

    var dirs = options.directories;

    // Load task dependencies
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');

    // Set clean config
    if( options.cleanup === true ){
      var cleanConfig =  [dirs.root + '/' + dirs.coverage];
      grunt.config("clean." + this.name, cleanConfig);
      grunt.task.run('clean:' + this.name);
    }


    // Set instrument config
    var instrumentConfig = {
      files: dirs.sourceFiles + '/*.js',
      options: {
        lazy: true,
        basePath: dirs.root + '/' + dirs.coverage + '/instrument/'
      }
    };
    grunt.config("instrument", instrumentConfig);
    grunt.task.run('instrument');

    // Run unit tests
    if( typeof options.unitTestTask !== "string" ){
      grunt.fail.warn("You must specify a unitTestTask option for not_constantinople.");
    }
    grunt.task.run( options.unitTestTask );


    // Store coverage
    var storeCoverageConfig = {
      options: {
        dir: dirs.root + '/' + dirs.coverage + '/reports'
      }
    };
    grunt.config("storeCoverage", storeCoverageConfig);
    grunt.task.run('storeCoverage');


    // Store coverage
    var makeReportConfig = {
      src: dirs.root + '/' + dirs.coverage + '/reports/**/*.json',
      options: {
        type: options.report.type,
        dir: dirs.root + '/' + dirs.coverage + '/reports',
        print: options.report.print
      }
    };
    grunt.config("makeReport", makeReportConfig);
    grunt.task.run('makeReport');


    // Only run coverage checker if thesholds are set
    if( typeof options.thresholds === "object" ){

      var coverageConfig = {
        options: {
          thresholds: options.thresholds,
          dir: dirs.coverage + '/reports/',
          root: dirs.root
        }
      };
      grunt.config("coverage", coverageConfig);
      grunt.task.run('coverage');

    }

  });

};
