
import { IBookUserCategories } from '@/types/data/Books';
import { useEffect, useState, useCallback } from 'react';
import requestParameters from '../ultis/requestParameters';

export default function useMangas(initialIDs: number[]) {
  const mangaLimit= 5;
  const [mangas, setMangas]= useState<IBookUserCategories[]>([]);
  const [pullContent, setPullContent]= useState(true);
  const [iDsMangas, setIDsMangas]= useState<number[]>(initialIDs);
  const [attemps, setAttemps]= useState(0);

  const contentRequest= useCallback(async () => {
    const requestMangas= await fetch('/api/book/random', {
      ...requestParameters.json,
      body: JSON.stringify({
        iDs: iDsMangas
      })
    });
    const responseMangas= await requestMangas.json();
    setAttemps(oldAttemps=> oldAttemps+1);
    if(responseMangas!==null) {
      setMangas(oldMangas=> [...oldMangas, responseMangas]);
      setIDsMangas((oldIDsMangas: number[] | any)=> [...oldIDsMangas, responseMangas.id]);
    }
    return responseMangas;
  }, [mangas, iDsMangas, attemps]);
  
  useEffect(() => {
    if(mangas.length<mangaLimit && (attemps-mangas.length)<2) {
      setTimeout(async ()=> {
        await contentRequest();
        setPullContent(oldPullContent=>!oldPullContent);
      }, 125);
    }
  }, [pullContent]);

  return { mangas };
}