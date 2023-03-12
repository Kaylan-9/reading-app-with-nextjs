import { ICategory } from "../data/Category";
import { IUserBookCategoriesPublic } from "../data/Users";

export interface IHomePageProps {
  users: IUserBookCategoriesPublic[];
  nOfPages: number;
  pagination: number;
  categories: ICategory[];
};
