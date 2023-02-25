import { IBookUserCategories } from "../data/Books";

export interface IMangaEdit {
  books: IBookUserCategories[];
  _delete: boolean;
}