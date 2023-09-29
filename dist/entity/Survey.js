"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Survey = void 0;
class Survey {
    constructor(value, userId, id, createdAt, updatedAt) {
        this._id = id;
        this._value = value;
        this._userId = userId;
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();
    }
    get id() {
        return this._id;
    }
    get value() {
        return this._value;
    }
    get userId() {
        return this._userId;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    updated() {
        this._updatedAt = new Date();
    }
}
exports.Survey = Survey;
