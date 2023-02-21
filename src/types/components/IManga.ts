import { ReactNode } from "react";

export interface IManga {
  id: number;
  title: string;
  category: string;
  images: any[];
  children: ReactNode;
}
