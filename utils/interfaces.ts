export interface iMainProps {
  email: string;
  fullName: string;
  initials: string;
  gender: string;
  bio: string;
  profession: string;
  password: string;
  avatar: string;
  verify: boolean;
  firstLogin: boolean;
  token: string;

  allCards: Array<{}>;
  allBookmarks: Array<{}>;
}

export interface iMainData extends Document, iMainProps {}

// For CardModel
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

export interface iCardData extends Document, iCardProps {}

// For bookMarkModel
export interface iProps {
  bookmark: {}[];
}

export interface iBookmarkData extends Document, iProps {}
