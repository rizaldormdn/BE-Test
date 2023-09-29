"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attack {
    constructor(sourceCountry, destinationCountry, millisecond, type, weight, attackTime) {
        this._sourceCountry = sourceCountry;
        this._destinationCountry = destinationCountry;
        this._millisecond = millisecond;
        this._type = type;
        this._weight = weight;
        this._attackTime = attackTime;
    }
    get sourceCountry() {
        return this._sourceCountry;
    }
    get destinationCountry() {
        return this._destinationCountry;
    }
    get millisecond() {
        return this._millisecond;
    }
    get type() {
        return this._type;
    }
    get weight() {
        return this._weight;
    }
    get attackTime() {
        return this._attackTime;
    }
}
exports.default = Attack;
