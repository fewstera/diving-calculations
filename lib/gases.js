'use strict';
var conversions = require('./conversions');
var constants = require('./constants');

var gases = {
    mod(ppo2, fractiono2) {
        let modInBar = ppo2 / fractiono2;
        return conversions.barToDepthInMeters(modInBar);
    },
    partialPressure(fractionOfGas, abPressure) {
        return fractionOfGas * abPressure;
    },
    bestMixNitrox(ppo2, depth) {
        let pressureAtDepth = conversions.depthInMetersToBar(depth);
        let fractionO2 = (ppo2 / pressureAtDepth).toPrecision(10);

        return {
            'o2': conversions.toDecimalPlaces(fractionO2, 2, Math.floor),
            'he': 0
        }
    },  
    bestMixEAD(ppo2, targetDepth, equivDepth) {
        let equivPressure = conversions.depthInMetersToBar(equivDepth);
        let targetDepthPressure = conversions.depthInMetersToBar(targetDepth);

        let inspiredPartialPressureN = gases.partialPressure(constants.FRACTION_NITROGEN_IN_AIR, equivPressure);

        let bestFractionNitrogen = inspiredPartialPressureN / targetDepthPressure;
        let bestFractionO2 = gases.bestMixNitrox(ppo2, targetDepth).o2;

        let roundedFractionN = conversions.toDecimalPlaces(bestFractionNitrogen, 2);
        let bestFractionHelium = 1 - bestFractionO2 - roundedFractionN;

        return {
            'o2': bestFractionO2,
            'he': conversions.toDecimalPlaces(bestFractionHelium, 2)
        };
    }
};

module.exports = gases;
