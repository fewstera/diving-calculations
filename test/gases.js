'use strict';
var assert = require('chai').assert;
var gases = require('../lib/gases.js');

describe('Gas calculations', function() {
  describe('mod(ppo2, fo2)', function () {
    it('should calculate the mod in meters for a given max ppo2 and fraction of o2', function () {
      assert.approximately(gases.mod(1.6, 1.00), 6, 0.01); // 100% at 1.6 (6m MOD)
      assert.approximately(gases.mod(1.4, 0.32), 33.75, 0.01); // 32% at 1.4 (33.75m MOD)
    });
  });

  describe('partialPressure(fractionOfGas, abPressure)', function () {
    it('should calculate the partial pressure of a gas given and fraction of gas and absolute pressure', function () {
      assert.approximately(gases.partialPressure(1.00, 1.6), 1.6, 0.01);
      assert.approximately(gases.partialPressure(0.32, 4.375), 1.4, 0.01);
      assert.approximately(gases.partialPressure(0.50, 3.2), 1.6, 0.01);
    });
  });

  describe('bestMixNitrox(ppo2, depth)', function () {
    it('should calculate best Nitrox mix', function () {
        assert.deepEqual(gases.bestMixNitrox(1.4, 40),
        {
            'o2': 0.28,
            'he': 0 
        });

        assert.deepEqual(gases.bestMixNitrox(1.4, 32), 
        {
            'o2': 0.33,
            'he': 0 
        });

        assert.deepEqual(gases.bestMixNitrox(1.6, 22), 
        {
            'o2': 0.5,
            'he': 0 
        });
    });
  });

  describe('bestMixEAD(ppo2, depth, ead)', function () {
    it('should calculate best trimix from an EAD', function () {
        assert.deepEqual(gases.bestMixEAD(1.4, 60, 30),
        {
            'o2': 0.20,
            'he': 0.35 
        });
    });
  });
});
