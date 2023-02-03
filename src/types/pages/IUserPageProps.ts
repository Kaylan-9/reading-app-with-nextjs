import { BookUser } from "@/lib/db/books";
import { Users } from "@/lib/db/users";

export interface IUserPageProps {
  userData: (Users & {book: BookUser[]}) | null;
  userExist: boolean;
  loggedInUser: boolean;
};