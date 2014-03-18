'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var fs = require('fs');

// It seems strange to have poor test coverage on an Istanbul wrapper, but
// it mostly tests itself by successfully running. The module doesn't really
// do anything other than call other tasks, so I think some basic tests will
// suffice. If you feel otherwise, feel free to change it.

exports.not_constantinople = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    test.equal( fs.existsSync('test/coverage/instrument/app/test.js'), true, 'should create instrument files' );
    test.equal( fs.existsSync('test/coverage/reports/coverage.json'), true, 'should create report files' );

    test.done();
  },
  custom_options: function(test) {
    test.expect(2);

    test.equal( fs.existsSync('custom_test/cov/instrument/app/test.js'), true, 'should create instrument files' );
    test.equal( fs.existsSync('custom_test/cov/reports/coverage.json'), true, 'should create report files' );

    test.done();
  }
};
