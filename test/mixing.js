var assert = require('chai').assert;
var mixing = require('../lib/mixing.js');

describe('Gas mixing', function() {
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
  describe('getAirToAdd(mix)', function () {
    it('should return the amount of air to add when filling an empty cylinder to air', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0,
                'he': 0
            },
            pressure: 0
        },
        target: {
            gas: {
                'o2': 0.21,
                'he': 0
            },
            pressure: 232
        }
      }
      assert.equal(232, mixing.getAirToAdd(mix));
    });
    it('should return the amount of air to add when topping an air fill', function () {
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
                'o2': 0.21,
                'he': 0
            },
            pressure: 232
        }
      }
      assert.equal(132, mixing.getAirToAdd(mix));
    });
    it('should return the amount of air to add when topping a nitrox fill', function () {
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
                'o2': 0.50,
                'he': 0
            },
            pressure: 200
        }
      }
      assert.equal(mixing.getAirToAdd(mix), 126.5822785);
    });
    it('should return the amount of air to add when topping a trimix fill', function () {
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
      assert.equal(mixing.getAirToAdd(mix), 143.2911392);
    });
  });
  describe('getOxygenToAdd(mix)', function () {
    it('should return the amount of o2 to add when filling an empty cylinder with nitrox', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0,
                'he': 0
            },
            pressure: 0
        },
        target: {
            gas: {
                'o2': 0.50,
                'he': 0
            },
            pressure: 200
        }
      }
      assert.equal(mixing.getOxygenToAdd(mix), 73.41772151);
    });
    it('should return the amount of o2 to add when topping up a nitrox mix', function () {
      var mix = {
        current: {
            gas: {
                'o2': 0.50,
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
      assert.equal(mixing.getOxygenToAdd(mix), 36.70886076);
    });
    it('should return the amount of o2 to add when topping up a trimix mix', function () {
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
      assert.equal(mixing.getOxygenToAdd(mix), 7.308860768);
    });
  });
});
