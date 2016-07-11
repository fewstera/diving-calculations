'use strict';
var conversions = require('./conversions');

var mixing = {
    getHeliumToAdd(mix) {
        let currentPressureHe = mix.current.gas.he * mix.current.pressure;
        let targetPressureHe = mix.target.gas.he * mix.target.pressure;

        return (targetPressureHe - currentPressureHe).toPrecision(10);
    },
    getOxygenToAdd(mix) {
        let currentPressureO2 = mix.current.gas.o2 * mix.current.pressure;
        let targetPressureO2 = mix.target.gas.o2 * mix.target.pressure;
        
        return 100;
    }
};

module.exports = mixing;
