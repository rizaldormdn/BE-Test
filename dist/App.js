"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const pg_1 = require("pg");
const Repository_1 = __importDefault(require("./repository/Repository"));
const Router_1 = __importDefault(require("./Router"));
const Server_1 = __importDefault(require("./Server"));
const pool = new pg_1.Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: Number(process.env.DB_PORT),
});
const repository = new Repository_1.default(pool);
Server_1.default.run(Number(process.env.PORT), Router_1.default.run(repository));
