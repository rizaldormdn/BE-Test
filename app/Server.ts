import bodyParser from "body-parser";
import express, { Express, Router } from "express";
import { WebSocket } from "ws";
import Middleware from "./middleware/Middleware";

export default class Server {
  public static run(port: number, router: Router) {
    const app: Express = express();

    app.use(Middleware.cors);
    app.use(bodyParser.json()); // parse requests of content-type - application/json
    app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
    app.use("/", router);
    const server = app.listen(port, () => {
      console.log(`The HTTP server is running on port ${port}`);
    });

    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: WebSocket) => {
      console.log("client connected");

      ws.on("message", (message: string) => {
        console.log(`message from client: ${message}`);
        ws.send(`server received your message ${message}`);
      });

      ws.on("close", () => {
        console.log("client disconnected");
      });
    });

    const client = new WebSocket("ws://localhost:7878");
    client.on("open", () => {
      console.log("Koneksi WebSocket terbuka");
      if (client.readyState === WebSocket.OPEN) {
        client.send("hallo");
      }
    });

    client.on("message", (message) => {
      // Pesan yang diterima dari server
      console.log("message from server:", message.toString("utf-8"));
    });

    client.on("close", () => {
      console.log("Koneksi WebSocket ditutup");
    });
  }
}
