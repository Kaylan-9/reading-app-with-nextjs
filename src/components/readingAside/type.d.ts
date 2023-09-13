import { ICategory } from '@/types/data/Category';
import { type } from 'os';

type IReadingAside={
  categories: ICategory[]
  doNotShow?: string[]
};

export type TOption={
  name: string;
  color?: string;
  onClick: () => void;
};

export default TReadingAside;