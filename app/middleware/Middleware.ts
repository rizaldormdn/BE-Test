require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default class Middleware {
  public static cors(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", String(process.env.ORIGINS));
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "content-type");

    next();
  }
  public static authentication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let token = String(req.headers["authorization"]).split(" ")[1];
      res.locals.user = jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET)
      );
      next();
    } catch (error) {
      console.error(error);
      res
        .status(403)
        .json({
          statusCode: 403,
          message: "failed to verify the token",
        })
        .end();
    }
    return;
  }
}
