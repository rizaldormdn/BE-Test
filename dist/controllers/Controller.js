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
const express_1 = require("express");
const Survey_1 = require("../entity/Survey");
const axios_1 = __importDefault(require("axios"));
const Attack_1 = __importDefault(require("../entity/Attack"));
class Controller {
    static router(repository) {
        const router = (0, express_1.Router)();
        router.get("/survey", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const survey = yield repository.survey();
                const surveyValue = survey.map((entry) => entry.value.map((value) => (value !== null ? value : 0)));
                const averageValue = Array.from({ length: surveyValue.length }, (_, i) => {
                    const index = surveyValue.map((entry) => entry[i]);
                    const total = index.reduce((acc, val) => acc + val, 0);
                    return total / surveyValue.length;
                });
                return res
                    .status(200)
                    .json({
                    success: true,
                    statuscode: 200,
                    data: averageValue,
                })
                    .end();
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({
                    success: false,
                    statuscode: 500,
                })
                    .end();
            }
        }));
        router.post("/survey", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let values = req.body.values;
                let userId = req.body.userId;
                let survey = new Survey_1.Survey(values, userId);
                yield repository.refactor2(survey);
                return res
                    .status(201)
                    .json({
                    success: true,
                    statuscode: 201,
                    data: survey,
                })
                    .end();
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({
                    success: false,
                    statuscode: 500,
                    error: error,
                })
                    .end();
            }
        }));
        router.get("/attack", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get("https://livethreatmap.radware.com/api/map/attacks?limit=10");
                const responseData = response.data;
                for (let array of responseData) {
                    for (let entry of array) {
                        const attack = new Attack_1.default(entry.sourceCountry, entry.destinationCountry, entry.millisecond, entry.type, entry.weight, entry.attackTime);
                        yield repository.storeAttack(attack);
                    }
                }
                return res
                    .status(201)
                    .json({
                    success: true,
                    statuscode: 201,
                })
                    .end();
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({
                    success: false,
                    statuscode: 500,
                    error: error,
                })
                    .end();
            }
        }));
        router.get("/attack-list", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const attackSnapshot = yield repository.getDataAttack();
                return res
                    .status(201)
                    .json({
                    success: true,
                    statuscode: 201,
                    data: attackSnapshot,
                })
                    .end();
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({
                    success: false,
                    statuscode: 500,
                    error: error,
                })
                    .end();
            }
        }));
        return router;
    }
}
exports.default = Controller;
