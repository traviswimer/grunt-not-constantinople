# grunt-not-constantinople

> Grunt task to easily add Istanbul code coverage using any unit-testing framework.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-not-constantinople --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-not-constantinople');
```

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
          tests: 'unit',
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

### Options

#### options.unitTestTask
Type: `String`

The string value for the Grunt task to be called to run your unit tests.


### Usage Examples

Coming soon.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

