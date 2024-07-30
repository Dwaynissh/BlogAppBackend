import { Router } from "express";
import {
  addLikesToCard,
  createCardData,
  deleteCard,
  editCardData,
  getAdventure,
  getAllCardData,
  getAllMain,
  getCardDataBySearch,
  getFiction,
  getNonFiction,
  getOneCardData,
  getReligious,
} from "../controller/cardController";

const router: Router = Router();

router.route("/create-card/:userID").post(createCardData);

router.route("/get-all-card").get(getAllCardData);
router.route("/get-all-main/:userID").get(getAllMain);
router.route("/get-one-card/:cardID").get(getOneCardData);
router.route("/search").get(getCardDataBySearch);
router.route("/fiction").get(getFiction);
router.route("/non-fiction").get(getNonFiction);
router.route("/adventure").get(getAdventure);
router.route("/religious").get(getReligious);

router.route("/edit-card/:cardID").patch(editCardData);
router.route("/like-card/:cardID").patch(addLikesToCard);

router.route("/delete-card/:userID/:cardID").delete(deleteCard);

export default router;
