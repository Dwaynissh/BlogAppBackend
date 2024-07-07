import { Document, Schema, Types, model } from "mongoose";

export interface iMainProps {
  blogName: string;

  allCards: Array<{}>;
  allBookmarks: Array<{}>;
}

interface iMainData extends Document, iMainProps {}

const mainModel = new Schema<iMainData>(
  {
    blogName: {
      type: String,
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
