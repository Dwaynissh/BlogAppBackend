import { Document, Schema, model } from "mongoose";
import { iBookmarkData } from "../utils/interfaces";

const bookmarkModel = new Schema<iBookmarkData>(
  {
    bookmark: {
      type: [],
      ref: "mainCard",
    },
  },
  { timestamps: true }
);

export default model<iBookmarkData>("bookmarks", bookmarkModel);
