'use strict';

module.exports = {
    depthInMetersToBar(depth) {
        return (depth / 10) + 1;
    },
    barToDepthInMeters(bar) {
        return (bar - 1) * 10;
    },
    toDecimalPlaces(number, dp, roundingFunction) {
        let dpPower = Math.pow(10, dp);
        roundingFunction = roundingFunction || Math.round;
        return roundingFunction(number * dpPower) / dpPower;
    }
}
