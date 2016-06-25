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

        let fractionNitrogen = inspiredPartialPressureN / targetDepthPressure;
        let fractionO2 = gases.bestMixNitrox(ppo2, targetDepth).o2;
        let fractionHe = 1 - fractionO2 - fractionNitrogen;

        return {
            'o2': fractionO2,
            'he': conversions.toDecimalPlaces(fractionHe.toPrecision(10), 2)
        };
    },
    bestMixEND(ppo2, targetDepth, equivDepth) {
        let totalGasPressure = conversions.depthInMetersToBar(targetDepth)
        let narcoticGasPressure = conversions.depthInMetersToBar(equivDepth);

        let fractionO2 = gases.bestMixNitrox(ppo2, targetDepth).o2;
        let fractionNarocticGases = narcoticGasPressure / totalGasPressure;
        let fractionHelium = 1 - fractionNarocticGases;

        return {
            'o2': fractionO2,
            'he': conversions.toDecimalPlaces(fractionHelium, 2)
        };
    }
};

module.exports = gases;
