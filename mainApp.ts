import { log } from "console";
import { Application, Request, Response } from "express";
import main from "./router/mainRouter";
import card from "./router/cardRouter";
import bookmark from "./router/bookmarkRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/main/", main);
    app.use("/card/", card);
    app.use("/bookmark/", bookmark);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome To Bookmark API 😊👍",
        });
      } catch (error) {
        log(error);
      }
    });
  } catch (error) {
    return error;
  }
};
