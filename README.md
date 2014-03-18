# grunt-not-constantinople [![Build Status](https://travis-ci.org/traviswimer/grunt-not-constantinople.png?branch=master)](https://travis-ci.org/traviswimer/grunt-not-constantinople)

> Grunt task to easily add Istanbul code coverage using any unit-testing framework.

## Getting Started
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.4` -- [Learn to use Grunt](http://gruntjs.com/getting-started)

Install the plugin with this command:

```shell
npm install grunt-not-constantinople --save-dev
```

Enable in your Gruntfile with:

```js
grunt.loadNpmTasks('grunt-not-constantinople');
```

## Quick setup

```js
grunt.initConfig({
  not_constantinople: {
    coverage: {
      options: {
        unitTestTask: "mochaTest"
      }
    }
  },
  mochaTest: {
    test: {
      options: {
        reporter: 'spec'
      },
      src: ['tests/**/*.js']
    }
  },
});
```

This uses [mochaTest](https://www.npmjs.org/package/grunt-mocha-test) as an example unit testing framework, but you can use any other framework instead. You just have to specify the task to be run as a string value for the `unitTestTask` option.

## The "not_constantinople" task

### Overview
In your project's Gruntfile, add a section named `not_constantinople` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  not_constantinople: {
    istanbul_options{
      options: {
        unitTestTask: 'myUnitTestingTask' // REQUIRED OPTION - This should be the task that runs your unit tests (e.g. 'mochaTest', 'nodeunit:myTests', etc.)
        // directory names to be used for your tests and coverage
        directories: {
          root: 'test',
          coverage: 'coverage',
          sourceFiles: 'app'
        },
        // Coverage thresholds. Set to false to ignore thresholds
        thresholds: {
          'statements': 90,
          'branches': 90,
          'lines': 90,
          'functions': 90
        },
        // The format of the coverage reports
        report: {
          type: 'lcov',
          print: 'detail'
        },
        cleanup: true, // removes the contents of the coverage folder before running istanbul
      }
    }
  },
});
```
*All values in this example represent the defaul values that will be used if they are not specified*

### Options

#### options.unitTestTask
Type: `String`

The string value for the Grunt task to be called to run your unit tests.

#### options.directories
Type: `object`
* __root__ - directory that will contain your coverage directory
* __coverage__ - directory that will contain all coverage files
* __sourceFiles__ - The source files that are used by your unit tests

#### options.thresholds
Type: `object`
* __statements__ - Percent coverage of statements that is considered passing
* __branches__ - Percent coverage of logical branches that is considered passing
* __lines__ - Percent coverage of lines that is considered passing
* __functions__ - Percent coverage of functions that is considered passing

#### options.report
Type: `object`
* __type__ - type of coverage report (e.g. lcov, html, etc.)
* __print__

#### options.cleanup
Type: `boolean`

If true, will remove the contents of the coverage folder before running istanbul

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

