import { Request, Response } from "express";
import mainModel from "../model/mainModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createBlogUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(3).toString("hex");

    const apiData = await mainModel.create({
      email,
      password: hashedPassword,
      token,
    });
    return res.status(201).json({
      message: "Successfully Registered User",
      data: apiData,
      status: 201,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Creating User" + error?.message,
      status: 404,
      error: console.error(),
    });
  }
};

export const createProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { fullName, gender, bio, profession } = req.body;
    const { id } = req.params;
    const user = await mainModel.findById(id);
    const init =
      fullName.charAt(0) + fullName.charAt(fullName.indexOf(" ") + 1);

    if (user && user.verify === true) {
      if (fullName && gender && bio && profession) {
        user.fullName = fullName;
        user.gender = gender;
        user.bio = bio;
        user.initials = init;
        user.profession = profession;
        user.firstLogin = true;

        await user.save();
        return res.status(201).json({
          message: "Successfully Updated User Profile",
          status: 201,
        });
      } else {
        return res.status(404).json({
          message: "Please Enter All Profile Details",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "No User Found Or Verified",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Updating User Profile",
      status: 404,
      error: console.error + error.message,
    });
  }
};

export const createAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    const { id } = req.params;
    const user = await mainModel.findById(id);
    if (user && user?.verify === true) {
      const profilePhoto = await mainModel.create({
        avatar,
      });
      return res.status(201).json({
        message: "Successfully Updated User Profile",
        status: 201,
        data: profilePhoto,
      });
    } else {
      return res.status(404).json({
        message: "No User Found Or Verified",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Updating User Profile",
      status: 404,
      error: console.error + error.message,
    });
  }
};

export const verifyBlogUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { token } = req.body;
    const user = await mainModel.findById(id);

    if (user?.token === token) {
      await mainModel.findByIdAndUpdate(
        id,
        {
          verifiedToken: "",
          verify: true,
        },
        { new: true }
      );

      return res.status(200).json({
        message: `${user?.email} Has Been Verified`,
        data: user,
      });
    } else {
      return res.status(404).json({
        message: "No Account Found With This Token",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Creating User: " + error?.message,
    });
  }
};

export const signInBlogUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const finduser = await mainModel.findOne({ email });

    if (finduser) {
      const passwordCheck = await bcrypt.compare(password, finduser.password);
      if (passwordCheck) {
        if (finduser.verify === true && finduser?.token) {
          const token = jwt.sign({ id: finduser._id }, "blogSecret", {
            expiresIn: "2d",
          });

          return res.status(200).json({
            message: "Successfully signed-in user, Welcome back 😊",
            status: 200,
            data: token,
          });
        } else {
          return res.status(404).json({
            message: "Your Account is not Verified",
            status: 404,
          });
        }
      } else {
        return res.status(404).json({
          message: "Your password is incorrect",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "This Account does not exist with us",
        status: 404,
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error Signing in User",
      status: 404,
      error: console.error + error.message,
    });
  }
};

export const getMain = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allUsers = await mainModel.find();

    return res.status(200).json({
      message: "Sucessfully Gotten All Data",
      data: allUsers,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Getting Data",
      status: 404,
      error: console.error(),
    });
  }
};

export const getOneMain = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await mainModel.findById(id);

    return res.status(200).json({
      message: "Sucessfully Gotten One User ",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Getting User  Data",
      status: 404,
      error: console.error(),
    });
  }
};

export const readUserCookie = async (req: Request, res: Response) => {
  try {
    const user = req.session;

    return res.status(200).json({
      message: "user read",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const logOutUser = async (req: any, res: Response) => {
  try {
    req.session.destroy();

    return res.status(200).json({
      message: "user has logged out",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};
