"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Survey_1 = require("../entity/Survey");
const AttackSnapshot_1 = __importDefault(require("../entity/AttackSnapshot"));
class Repository {
    constructor(pool) {
        this._pool = pool;
    }
    _updateDoSurvey(userId) {
        return new Promise((resolve, reject) => {
            this._pool.query(`UPDATE users SET dosurvey = true WHERE id = ?`, [userId], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(new Error("failed"));
                }
                resolve(result);
            });
        });
    }
    refactor2(survey) {
        return new Promise((resolve, reject) => {
            this._pool.query(`INSERT INTO surveys ("values", "createdAt", "updatedAt", "userId") VALUES ($1, $2, $3, $4)`, [survey.value, survey.createdAt, survey.updatedAt, survey.userId], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(new Error("failed"));
                }
                this._updateDoSurvey(survey.userId);
                resolve(result);
            });
        });
    }
    survey() {
        return new Promise((resolve, reject) => {
            this._pool.query(`SELECT "id", "values", "createdAt", "updatedAt", "userId" FROM surveys`, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(new Error("failed get an survey"));
                }
                let survey = [];
                if (result.rows.length > 0) {
                    for (let entry of result.rows) {
                        let data = new Survey_1.Survey(entry.values, entry.userId, entry.id, entry.createdAt, entry.updatedAt);
                        survey.push(data);
                    }
                }
                resolve(survey);
            });
        });
    }
    storeAttack(attack) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this._pool.query(`INSERT INTO attacks 
            (
              source_country, 
              destination_country, 
              millisecond, 
              type, 
              attack_time, 
              weight
            ) VALUES ($1, $2, $3, $4, $5, $6)`, [
                attack.sourceCountry,
                attack.destinationCountry,
                attack.millisecond,
                attack.type,
                attack.attackTime,
                attack.weight,
            ], (err, result) => {
                if (err) {
                    console.error(err);
                    reject(new Error("failed save an attack"));
                }
                resolve(result);
            });
        }));
    }
    getDataAttack() {
        return new Promise((resolve, reject) => {
            this._pool.query(`
        SELECT
          source_country,
          destination_country,
          type
          COUNT(*) AS count
        FROM
          attacks
        GROUP BY
          source_country,
          destination_country,
          type
        ORDER BY
          source_country,
          destination_country,
          type`, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(new Error("failed"));
                }
                const attackSnapshots = [];
                if (result.length > 0) {
                    for (let entry of result) {
                        const attackSnapshot = new AttackSnapshot_1.default(entry.sourceCountry, entry.destinationCountry, entry.type);
                        attackSnapshots.push(attackSnapshot);
                    }
                    resolve(attackSnapshots);
                }
            });
        });
    }
}
exports.default = Repository;
