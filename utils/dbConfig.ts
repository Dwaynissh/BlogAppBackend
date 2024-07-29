import { log } from "console";
import { connect } from "mongoose";
import dotnev from "dotenv";
dotnev.config();

export const dbConfig = async () => {
  try {
    return await connect(process.env.MONGO_DB_URL_LOCAL!).then(() =>
      log("DataBase connected 🔥🔥")
    );
  } catch (err: any) {
    log(err);
    return err;
  }
};
