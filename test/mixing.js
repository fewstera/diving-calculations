var assert = require('chai').assert;
var conversions = require('../lib/mixing.js');

describe('Gas mixing', function() {
  describe('requiredStartPressure(currentMix, requiredMix)', function () {
    it('return the', function () {
      assert.equal(3, conversions.depthInMetersToBar(20));
      assert.equal(1, conversions.depthInMetersToBar(0));
    });
  });
});
