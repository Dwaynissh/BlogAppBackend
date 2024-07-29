import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongo from "connect-mongodb-session";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT!;
const app: Application = express();
const mongoSession = mongo(session);

app.use(express.json());
app.use(cors({ origin: process.env.APP_URL_LOCAL!, credentials: true }));
app.use(cookieParser());

var store = new mongoSession({
  uri: process.env.MONGO_DB_URL_LOCAL!,
  collection: "session",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    cookie: {
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 48,
      secure: false,
    },
    store: store,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", process.env.APP_URL_LOCAL!);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mainApp(app);
const server = app.listen(port, async () => {
  console.clear();
  dbConfig();
  console.log(`Server Successfully conected on port ${port}`);
  console.log("......");
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
