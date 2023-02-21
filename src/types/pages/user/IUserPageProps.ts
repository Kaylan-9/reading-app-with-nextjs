
import { IUserBook } from "../../data/Users";

export interface IUserPageProps {
  userData: IUserBook | null;
  userExist: boolean;
  loggedInUser: boolean;
};