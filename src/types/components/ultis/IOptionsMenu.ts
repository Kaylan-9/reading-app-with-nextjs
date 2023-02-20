export interface IOptionsMenu {
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
