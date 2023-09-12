import { IBookUserCategories } from "../data/Comics";
import { ICategory } from "../data/Category";
import { IUserBookCategoriesPublic } from "../data/Users";

export interface IPaginationPageProps {
  users: IUserBookCategoriesPublic[];
  nOfPages: number;
  pagination: number;
  categories: ICategory[];
  currentPage: number,
  books: IBookUserCategories[];
};
