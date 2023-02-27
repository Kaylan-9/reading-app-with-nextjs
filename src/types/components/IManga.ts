import { ReactNode } from "react";

export interface IManga {
  id: number;
  title: string;
  idCategory: number;
  category: string;
  images: any[];
  children: ReactNode;
}
