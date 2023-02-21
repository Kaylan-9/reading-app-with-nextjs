import { IUserBook } from "@/types/data/Users";

export interface IUserProfileProps {
  userData: IUserBook;
  selection: {
    condi: number;
    func: (indice: number) => void;
  };
  options: {
    name: string,
    onClick?: any | undefined | null 
    user?: undefined | null | boolean
  }[];
};
