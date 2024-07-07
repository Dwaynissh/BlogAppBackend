import { Router } from "express";
import {
  createApiName,
  //   getAllData,
  getMain,
} from "../controller/mainController";

const router: Router = Router();

// router.route("/getall").get(getAllData);
router.route("/getmain").get(getMain);
router.route("/create-blog-name").post(createApiName);

export default router;
