"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
class Server {
    static run(port, router) {
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use("/", router);
        const server = app.listen(port, () => {
            console.log(`The HTTP server is running on port ${port}`);
        });
        const wss = new ws_1.WebSocket.Server({ server });
        wss.on("connection", (ws) => {
            console.log("client connected");
            ws.on("message", (message) => {
                console.log(`message from client: ${message}`);
                ws.send(`server received your message ${message}`);
            });
            ws.on("close", () => {
                console.log("client disconnected");
            });
        });
        const client = new ws_1.WebSocket("ws://localhost:7878");
        client.on("open", () => {
            console.log("Koneksi WebSocket terbuka");
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send("hallo");
            }
        });
        client.on("message", (message) => {
            console.log("message from server:", message.toString("utf-8"));
        });
        client.on("close", () => {
            console.log("Koneksi WebSocket ditutup");
        });
    }
}
exports.default = Server;
