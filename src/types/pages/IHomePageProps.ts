import { BookUser } from "@/lib/db/books";
import IProfile from "../IProfile";

export interface IHomePageProps {
  books: BookUser[];
  nOfPages: number;
  pagination: number;
  profiles: IProfile[];
};
