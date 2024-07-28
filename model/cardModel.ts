import { Document, Schema, Types, model } from "mongoose";
import { iCardData } from "../utils/interfaces";

const cardModel = new Schema<iCardData>(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: [],
    },
    main: {
      type: Types.ObjectId,
      ref: "main",
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iCardData>("cards", cardModel);
