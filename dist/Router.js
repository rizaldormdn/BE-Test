"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./controllers/Controller"));
class Router {
    static run(repository) {
        const router = (0, express_1.Router)();
        router.use("/", Controller_1.default.router(repository));
        return router;
    }
}
exports.default = Router;
