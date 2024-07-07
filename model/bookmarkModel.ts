import { Document, Schema, model } from "mongoose";

export interface iProps {
  bookmark: {}[];
}

interface iUserData extends Document, iProps {}

const bookmarkModel = new Schema<iUserData>(
  {
    bookmark: {
      type: [],
      ref: "mainCard",
    },
  },
  { timestamps: true }
);

export default model<iUserData>("bookmarks", bookmarkModel);
