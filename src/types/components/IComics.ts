import { IBookUserCategories } from "../data/Comics";

export default interface IMangas {
  title?: string;
  books: IBookUserCategories[];
};