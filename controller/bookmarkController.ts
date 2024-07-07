import { Request, Response } from "express";
import { log } from "console";
import bookmarkModel from "../model/bookmarkModel";
import cardModel from "../model/cardModel";

export const getBookmarkCards = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getCards = await bookmarkModel.find();

    return res.status(200).json({
      msg: "Gotten Bookmark successfully",
      data: getCards,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      message: "Error getting new bookmark",
      status: 404,
      error: console.error(),
    });
  }
};

export const addBookmark = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;
    const getCard = await cardModel.findById(cardID);

    const getAll = await bookmarkModel.create({
      bookmark: getCard,
    });

    return res.status(200).json({
      message: "Added Bookmark",
      data: getAll,
      status: 200,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      message: "Error Adding bookmark",
      status: 404,
      error: console.error(),
    });
  }
};

export const removeBookmark = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;
    const getCard = await cardModel.findByIdAndDelete(cardID);

    return res.status(200).json({
      mmessage: "Removed Bookmark",
      data: getCard,
      status: 200,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      message: "Error Deleting Bookmark",
      status: 404,
      error: console.error(),
    });
  }
};
