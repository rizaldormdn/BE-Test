require("dotenv").config();
import { Pool } from "pg";
import Repository from "./repository/Repository";
import Router from "./Router";
import Server from "./Server";

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: Number(process.env.DB_PORT),
});

const repository: Repository = new Repository(pool);

Server.run(Number(process.env.PORT), Router.run(repository));
