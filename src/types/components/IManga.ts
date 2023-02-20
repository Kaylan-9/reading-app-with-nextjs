import { ReactNode } from "react";

export interface IManga {
  id: number;
  title: string;
  images: any[];
  children: ReactNode;
}
