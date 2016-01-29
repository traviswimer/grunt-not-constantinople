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
        statements: 90,
        branches: 90,
        lines: 90,
        functions: 90
      },
      report: {
        type: 'lcov',
        print: 'detail'
      },
      cleanup: true,
      unitTestTask: false,
      instrumentationOptions: {},
      reportingOptions: {}
    });

    var dirs = options.directories;

    // Load task dependencies
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-istanbul-coverage');

    // Generate config for "clean:..." task(s), then run it
    if( options.cleanup === true ){
      var cleanTaskConfig =  [dirs.root + '/' + dirs.coverage];
      grunt.config("clean." + this.name, cleanTaskConfig);
      grunt.task.run('clean:' + this.name);
    }


    // Generate config for "instrument" task, then run it
    var instrumentationOptions = options.instrumentationOptions || {};
    instrumentationOptions.lazy = true;
    instrumentationOptions.basePath = dirs.root + '/' + dirs.coverage + '/instrument/';
    var instrumentTaskConfig = {
      files: dirs.sourceFiles + '/*.js',
      options: instrumentationOptions
    };
    grunt.config("instrument", instrumentTaskConfig);
    grunt.task.run('instrument');


    // Run unit tests
    if( typeof options.unitTestTask !== "string" ){
      grunt.fail.warn("You must specify a unitTestTask option for not_constantinople.");
    }
    grunt.task.run( options.unitTestTask );


    // Generate config for "storeCoverage" task, then run it
    var storeCoverageTaskConfig = {
      options: {
        dir: dirs.root + '/' + dirs.coverage + '/reports'
      }
    };
    grunt.config("storeCoverage", storeCoverageTaskConfig);
    grunt.task.run('storeCoverage');


    // Generate config for "makeReport" task, then run it
    var reportingOptions = options.reportingOptions || {};
    reportingOptions.type = options.report.type;
    reportingOptions.dir = dirs.root + '/' + dirs.coverage + '/reports';
    reportingOptions.print = options.report.print;
    var makeReportTaskConfig = {
      src: dirs.root + '/' + dirs.coverage + '/reports/**/*.json',
      options: reportingOptions
    };
    grunt.config("makeReport", makeReportTaskConfig);
    grunt.task.run('makeReport');


    // Only run coverage checker if thesholds are set
    if( typeof options.thresholds === "object" ){

      // Generate config for "coverage" task, then run it
      var coverageTaskConfig = {
        options: {
          thresholds: options.thresholds,
          dir: dirs.coverage + '/reports/',
          root: dirs.root
        }
      };
      grunt.config("coverage", coverageTaskConfig);
      grunt.task.run('coverage');

    }

  });

};
