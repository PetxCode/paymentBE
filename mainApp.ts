import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./error/mainError";
import { handleError } from "./error/handleError";
import store from "./router/storeRouter";

export const mainApp = (app: Application) => {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

  app.use(express.json());
  app.use("/api/v1", store);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: `Route Error`,
        message: `Route Error: because the page, ${req.originalUrl} doesn't exist`,
        status: HTTP.BAD_REQUEST,
        success: false,
      })
    );
  });

  app.use(handleError);
};
