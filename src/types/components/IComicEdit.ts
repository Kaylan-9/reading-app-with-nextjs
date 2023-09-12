import { IBookUserCategories } from "../data/Comics";

export interface IMangaEdit {
  books: IBookUserCategories[];
  _delete: boolean;
}