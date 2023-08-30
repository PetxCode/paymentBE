import express, { Application } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
env.config();

const port: number = parseInt(process.env.PORT!);

const app: Application = express();
mainApp(app);

const server = app.listen(port, () => {
  console.log();
  console.log("server connected...");
});

process.on("uncaughtException", (error: Error) => {
  console.log("Error due to uncaughtException");
  console.log(error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Error due to unhandledRejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
