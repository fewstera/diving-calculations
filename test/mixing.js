var assert = require('chai').assert;
var mixing = require('../lib/mixing.js');

describe('Gas mixing', function() {
  describe('getOxygenToAdd(mix)', function () {
    it('should return the amount of o2 to add when filling an empty cylinder', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0,
                'he': 0
            },
            pressure: 100
        },
        target: {
            gas: {
                'o2': 0.50,
                'he': 0
            },
            pressure: 200
        }
      }
      assert.equal(100, mixing.getOxygenToAdd(mix));
    });
  });
  describe('getHeliumToAdd(mix)', function () {
    it('should return zero when asking for Nitrox mix', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0.21,
                'he': 0
            },
            pressure: 100
        },
        target: {
            gas: {
                'o2': 0.50,
                'he': 0
            },
            pressure: 232
        }
      }
      assert.equal(0, mixing.getHeliumToAdd(mix));
    });
    it('should return the pressure of helium to add when asking for a trimix mix from empty', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0.21,
                'he': 0
            },
            pressure: 0
        },
        target: {
            gas: {
                'o2': 0.16,
                'he': 0.50
            },
            pressure: 200
        }
      }
      assert.equal(100, mixing.getHeliumToAdd(mix));
    });
    it('should return the pressure of helium to add when asking for a trimix mix from a half filled cylinder', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0.18,
                'he': 0.30
            },
            pressure: 50
        },
        target: {
            gas: {
                'o2': 0.20,
                'he': 0.20
            },
            pressure: 232
        }
      }
      assert.equal(31.4, mixing.getHeliumToAdd(mix));
    });
  });
});
