
import { ICategory } from "@/types/data/Category";
import { IUserBookCategories } from "../../data/Users";

export interface IUserPageProps {
  userData: IUserBookCategories | null;
  loggedInUser: boolean;
  categories: ICategory[];
};