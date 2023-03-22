import { createContext, ReactNode, useState } from "react";

const initialValueCategories = {
  view: true, 
  setView: ()=> true
};

interface IPropsCategories {
  view: boolean; 
  setView: (newValue: any) => any;
}

export const CategoriesContext = createContext<IPropsCategories>(initialValueCategories);

export default function CategoriesProvider({children}: {children: ReactNode}) {
  const [view, setView] = useState<boolean>(initialValueCategories.view);

  return (<CategoriesContext.Provider value={{view, setView}}>
    {children}
  </CategoriesContext.Provider>);
};