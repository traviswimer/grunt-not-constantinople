'use strict';


var testModule = require('../test/coverage/instrument/app/test');


exports.test = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  simple_funtion: function(test) {
    test.expect(1);


    test.equal(testModule.simpleFunction(), true, 'should return true');

    test.done();
  }
};
