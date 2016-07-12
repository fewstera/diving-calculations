'use strict';
var conversions = require('./conversions');
var constants = require('./constants');

var mixing = {
    getHeliumToAdd(mix) {
        let currentPressureHe = mix.current.gas.he * mix.current.pressure;
        let targetPressureHe = mix.target.gas.he * mix.target.pressure;

        return (targetPressureHe - currentPressureHe).toPrecision(10);
    },
    getAirToAdd(mix) {
        let currentFraN = 1 - mix.current.gas.o2 - mix.current.gas.he;
        let targetFraN = 1 - mix.target.gas.o2 - mix.target.gas.he;

        let currentPressureN = currentFraN * mix.current.pressure;
        let targetPressureN = targetFraN * mix.target.pressure;
        
        let nitrogenToAdd = (targetPressureN - currentPressureN);

        
        return (nitrogenToAdd / constants.FRACTION_NITROGEN_IN_AIR).toPrecision(10);
    },
    getOxygenToAdd(mix) {
        let currentPressureO2 = mix.current.gas.o2 * mix.current.pressure;
        let targetPressureO2 = mix.target.gas.o2 * mix.target.pressure;

        let o2FromAir = mixing.getAirToAdd(mix) * constants.FRACTION_O2_IN_AIR;
        let totalO2Needed = (targetPressureO2 - currentPressureO2);
        
        return (totalO2Needed - o2FromAir).toPrecision(10);
    }
};

module.exports = mixing;
