var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
chai.Assertion.includeStack = true;
mocha.setup(window.TEST_MOCHA_SETUP);

require.config(window.TEST_REQUIRE_CONFIG);
require(['../testem'], function(){
  require(window.TEST_SPECS, function(module){
    mocha.run();
  });
});
