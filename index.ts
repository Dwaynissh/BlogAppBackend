import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongo from "connect-mongodb-session";

const port: number = 4007;
const app: Application = express();
const mongoSession = mongo(session);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

var store = new mongoSession({
  uri: "mongodb://localhost:27017/bookmarkDB",
  collection: "session",
});

app.use(
  session({
    secret: "just-work",
    cookie: {
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 48,
      secure: false,
    },
    store: store,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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
