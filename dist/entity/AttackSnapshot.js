"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttackSnapshot {
    constructor(sourceCountry, destinationCountry, type) {
        this._sourceCountry = sourceCountry;
        this._destinationCountry = destinationCountry;
        this._type = type;
    }
    get sourceCountry() {
        return this._sourceCountry;
    }
    get destinationCountry() {
        return this._destinationCountry;
    }
    get type() {
        return this._type;
    }
}
exports.default = AttackSnapshot;
