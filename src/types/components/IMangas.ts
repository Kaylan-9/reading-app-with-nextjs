import { BookUser } from "@/lib/db/books";

export default interface IMangas {
  title?: string, 
  books: BookUser[]
};