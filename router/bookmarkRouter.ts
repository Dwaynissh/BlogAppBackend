import { Router } from "express";

import {
  addBookmark,
  getBookmarkCards,
  removeBookmark,
} from "../controller/bookmarkController";

const router: Router = Router();

router.route("/get-bookmarks").get(getBookmarkCards);

router.route("/add-bookmark/:cardID").post(addBookmark);

router.route("/remove-bookmark/:cardID").delete(removeBookmark);

export default router;
