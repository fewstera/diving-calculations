var assert = require('chai').assert;
var conversions = require('../lib/conversions.js');

describe('Conversions', function() {
  describe('depthInMetersToBar', function () {
    it('return the pressure in bar for the depth in meters', function () {
      assert.equal(3, conversions.depthInMetersToBar(20));
      assert.equal(1, conversions.depthInMetersToBar(0));
    });
  });
  describe('barToDepthInMeters', function () {
    it('return the depth in meters for a given pressure in bar', function () {
      assert.equal(100, conversions.barToDepthInMeters(11));
      assert.equal(0, conversions.barToDepthInMeters(1));
    });
  });
  describe('toDecimalPlaces(number, dp, roundType)', function () {
    it('should return the given number to the chosen number of decimal places using the rounding function provided', function () {
      assert.equal(0.12, conversions.toDecimalPlaces(0.129999, 2, Math.floor));
      assert.equal(0.87, conversions.toDecimalPlaces(0.869123, 2, Math.round));
      assert.equal(89.2211, conversions.toDecimalPlaces(89.2210099, 4, Math.ceil));
    });
    it('should default to Math.round when no rounding function provided', function () {
      assert.equal(0.12, conversions.toDecimalPlaces(0.12499, 2));
      assert.equal(500, conversions.toDecimalPlaces(500.123123, 0));
    });
  });
});
