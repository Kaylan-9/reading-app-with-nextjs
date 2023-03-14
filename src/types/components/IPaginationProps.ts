export interface IPaginationProps {
  baseURL: (position: number) => string ;
  nOfPages: number; 
  current: number;
};