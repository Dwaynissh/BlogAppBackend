import { Router } from "express";
import {
  createAvatar,
  createBlogUser,
  createProfile,
  getMain,
  getOneMain,
  logOutUser,
  readUserCookie,
  signInBlogUser,
  verifyBlogUser,
} from "../controller/mainController";

const router: Router = Router();
router.route("/create-user").post(createBlogUser);
router.route("/create-profile/:id").post(createProfile);
router.route("/create-avatar/:id").post(createAvatar);
router.route("/login-user").post(signInBlogUser);

router.route("/verify-user/:id").patch(verifyBlogUser);

router.route("/getusers").get(getMain);
router.route("/read-cookie").get(readUserCookie);
router.route("/get-one-user/:id").get(getOneMain);

router.route("/logout").delete(logOutUser);

export default router;
