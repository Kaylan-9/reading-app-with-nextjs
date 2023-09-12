import { ReactNode } from "react";

export default interface IComic {
  id: number;
  title: string;
  idCategory: number;
  category: string;
  images: any[];
  children?: ReactNode;
}
