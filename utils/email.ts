import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

// Dwaynissh@gmail.com
const GOOGLE_ID =
  "265727848227-v9gm76419od83e09lcgidq7j2f2ef8jd.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH =
  "1//04jQ0P5pu_dILCgYIARAAGAQSNwF-L9IrJjH8M6DiPLyr2_DMKpOdx2HQzJEG5uo5yyl0WGTiqZ8NJfSTzVI1EmKWzPFcSo7mBtk";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH });

const URL: string = `http://localhost:5173`;

export const sendEmail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "princechimelajohn@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const getFile = path.join(__dirname, "../views/index.ejs");

    const data = {
      token: user.token,
      email: user.email,
      url: `${URL}/user-verify/${user._id}`,
    };

    const html = await ejs.renderFile(getFile, { data });

    const mailer = {
      from: "FoodFlex🔥🔥 <dwaynissh@gmail.com>",
      to: user.email,
      subject: "Account Opening",
      html,
    };

    await transporter.sendMail(mailer).then(() => {
      console.log("send");
    });
  } catch (error) {
    return error;
  }
};

export const sendResetPasswordEmail = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientSecret: GOOGLE_SECRET,
        clientId: GOOGLE_ID,
        refreshToken: GOOGLE_REFRESH,
        accessToken,
      },
    });

    const getFile = path.join(__dirname, "../views/resetPassword.ejs");

    const data = {
      token: user.token,
      email: user.email,
      url: `${URL}/user-verify/${user._id}`,
    };

    const html = await ejs.renderFile(getFile, { data });

    const mailer = {
      from: "CodeLab🔥🔥 <codelabbest@gmail.com>",
      to: user.email,
      subject: "Account Opening",
      html,
    };

    await transporter.sendMail(mailer).then(() => {
      console.log("send");
    });
  } catch (error) {
    return error;
  }
};
