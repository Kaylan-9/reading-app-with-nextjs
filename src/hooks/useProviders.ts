import { useEffect, useState } from 'react';
import requestParameters from '../utils/requestParameters';

export default function useProviders() {
  const [ providers, setProviders ]= useState<any | null>([]);

  useEffect(()=> {  
    (async () => {
      const requestProviders= await fetch(`/api/providers`, requestParameters.json);
      const responseProviders= await requestProviders.json();
      setProviders(responseProviders.providers);
    })();
  }, []);

  return providers;
};