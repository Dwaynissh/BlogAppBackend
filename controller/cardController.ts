import { Request, Response } from "express";
import cardModel from "../model/cardModel";
import mainModel from "../model/mainModel";
import { Types } from "mongoose";

export const createCardData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, author, description, image, category, content } = req.body;
    const { userID } = req.params;

    const main = await mainModel.findById(userID);

    if (main) {
      const cardData = await cardModel.create({
        title,
        author,
        description,
        image,
        category,
        content,
      });

      main?.allCards.push(new Types.ObjectId(cardData._id));
      main?.save();

      return res.status(201).json({
        message: "Sucessfully Created Card",
        data: cardData,
        status: 201,
      });
    } else {
      return res.status(404).json({
        message: "No user Created",
        status: 404,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Creating Card",
      status: 404,
      error: console.error(),
    });
  }
};

export const editCardData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;
    const { title, description, image, category, content } = req.body;

    const cardData = await cardModel.findByIdAndUpdate(cardID, {
      title,
      description,
      image,
      category,
      content,
    });
    return res.status(200).json({
      message: "Sucessfully Updated Card Data",
      data: cardData,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Updated Card Data",
      status: 404,
      error: console.error(),
    });
  }
};

export const getOneCardData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;

    const oneCardData = await cardModel.findById(cardID);

    return res.status(200).json({
      message: "Sucessfully Gotten One Card",
      data: oneCardData,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Getting One Card",
      status: 404,
      error: console.error(),
    });
  }
};

export const getAllCardData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allCardData = await cardModel.find();

    if (allCardData.length > 0) {
      return res.status(200).json({
        message: "Sucessfully Gotten All Cards",
        data: allCardData,
        status: 200,
      });
    } else {
      return res.status(200).json({
        message: "Correct Route, But No Data In The Array Currently = Empty []",
        status: 200,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error Getting Cards",
      status: 404,
      error: console.error(),
    });
  }
};

export const getAllMain = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const mainCardData = await mainModel.findById(userID).populate({
      path: "allCards",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "Sucessfully Gotten All Cards",
      data: mainCardData,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Getting Cards",
      status: 404,
      error: console.error(),
    });
  }
};

export const getCardDataBySearch = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title } = req.query;

    const searchedCard = await cardModel.find({ title });

    return res.status(200).json({
      message: "Sucessfully Searched Card",
      data: searchedCard,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Searching Card",
      status: 404,
      error: console.error(),
    });
  }
};

export const getFiction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cards = await cardModel.find();

    const fictionCards = cards.filter((el) => {
      return el.category === "fiction";
    });

    if (fictionCards.length > 0) {
      return res.status(200).json({
        message: "Successfully Gotten Fiction Cards",
        data: fictionCards,
      });
    } else {
      return res.status(200).json({
        message: "Error Empty Card Array []",
        data: console.error(),
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Getting Fiction Cards",
      data: error.message,
    });
  }
};

export const getNonFiction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cards = await cardModel.find();

    const nonFictionCards = cards.filter((el) => {
      return el.category === "non-fiction";
    });

    if (nonFictionCards.length > 0) {
      return res.status(200).json({
        message: "Successfully Gotten Fiction Cards",
        data: nonFictionCards,
      });
    } else {
      return res.status(200).json({
        message: "Error Empty Card Array []",
        data: console.error(),
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Getting Fiction Cards",
      data: error.message,
    });
  }
};

export const getAdventure = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cards = await cardModel.find();

    const adventureCards = cards.filter((el) => {
      return el.category === "adventure";
    });

    if (adventureCards.length > 0) {
      return res.status(200).json({
        message: "Successfully Gotten Fiction Cards",
        data: adventureCards,
      });
    } else {
      return res.status(200).json({
        message: "Error Empty Card Array []",
        data: console.error(),
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Getting Fiction Cards",
      data: error.message,
    });
  }
};

export const getReligious = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const cards = await cardModel.find();

    const religiousCards = cards.filter((el) => {
      return el.category === "religious";
    });

    if (religiousCards.length > 0) {
      return res.status(200).json({
        message: "Successfully Gotten Fiction Cards",
        data: religiousCards,
      });
    } else {
      return res.status(200).json({
        message: "Error Empty Card Array []",
        data: console.error(),
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Getting Fiction Cards",
      data: error.message,
    });
  }
};

export const addLikesToCard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;
    const card = await cardModel.findById(cardID);
    const likeValue = Math.floor(Math.random() * Date.now()).toString();

    const likedCard = await cardModel.findByIdAndUpdate(
      cardID,
      {
        likes: [...card?.likes!, likeValue],
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Sucessfully Liked Card",
      data: likedCard,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Liking Card",
      status: 404,
      error: console.error(),
    });
  }
};

export const deleteCard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cardID } = req.params;
    const findCard = await cardModel.findByIdAndDelete(cardID);

    return res.status(404).json({
      message: "Successfully deleted card",
      status: 200,
      data: findCard,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error deleting card",
      status: 404,
      error: console.error(),
    });
  }
};
