import { Document, Schema, Types, model } from "mongoose";

export interface iCardProps extends Document {
  title: string;
  author: string;
  description: string;
  image: string;
  likes: Array<string>;
  category: string;
  content: string;
  main: {};
}

interface iCardData extends Document, iCardProps {}

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
