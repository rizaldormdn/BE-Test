import { Router as ExpressRouter } from "express";
import Repository from "./repository/Repository";
import Controller from "./controllers/Controller";

export default class Router {
  public static run(repository: Repository): ExpressRouter {
    const router: ExpressRouter = ExpressRouter();

    router.use("/", Controller.router(repository));
    return router;
  }
}
