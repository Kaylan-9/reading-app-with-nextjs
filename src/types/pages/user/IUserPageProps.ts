
import { IUserBookCategories } from "../../data/Users";

export interface IUserPageProps {
  userData: IUserBookCategories | null;
  loggedInUser: boolean;
};