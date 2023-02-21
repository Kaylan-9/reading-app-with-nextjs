import { IBookUserCategories } from "../data/Books";

export default interface IMangas {
  title?: string;
  link?: string;
  linkname?: string;
  books: IBookUserCategories[];
};