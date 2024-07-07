import { Request, Response } from "express";
import mainModel from "../model/mainModel";
import cardModel from "../model/cardModel";
import lodash from "lodash";

export const createApiName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { blogName } = req.body;

    const apiData = await mainModel.create({
      blogName,
    });
    return res.status(201).json({
      message: "Welcome to Main API",
      data: apiData,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Creating Api name",
      status: 404,
      error: console.error(),
    });
  }
};

// export const getAllData = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const allCardData = await mainModel
//       .find()
//       .populate({ path: "allCategory" });

//     const allCategory = await cardModel.find();

//     const categorize = lodash.groupBy(allCategory, "category");

//     console.log("ya", categorize);

//     allCardData[0].allCategory.push(categorize);
//     allCardData[0].save();

//     return res.status(200).json({
//       message: "Sucessfully Gotten All Data",
//       data: allCardData,
//       status: 200,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(404).json({
//       message: "Error Getting Data",
//       status: 404,
//       error: console.error(),
//     });
//   }
// };

export const getMain = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allCardData = await mainModel.find();

    return res.status(200).json({
      message: "Sucessfully Gotten All Data",
      data: allCardData,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      message: "Error Getting Data",
      status: 404,
      error: console.error(),
    });
  }
};
