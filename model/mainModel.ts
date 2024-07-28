import { Schema, Types, model } from "mongoose";
import { iMainData } from "../utils/interfaces";

const mainModel = new Schema<iMainData>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
    },
    initials: {
      type: String,
    },
    gender: {
      type: String,
    },
    profession: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },

    firstLogin: {
      type: Boolean,
      default: false,
    },

    allCards: [
      {
        type: Types.ObjectId,
        ref: "cards",
      },
    ],
    allBookmarks: [
      {
        type: Types.ObjectId,
        ref: "bookmarks",
      },
    ],
  },
  { timestamps: true }
);

export default model<iMainData>("main", mainModel);
