import { IBookUserCategories } from "../data/Books";
import { ICategory } from "../data/Category";

export interface IHomePageProps {
  books: IBookUserCategories[];
  nOfPages: number;
  pagination: number;
  categories: ICategory[];
};
