import React, { useEffect, useState } from 'react'
import requestParameters from './requestParameters';

export default function useProviders() {
  const [ providers, setProviders ]= useState<any | null>([]);

  useEffect(()=> {  
    (async () => {
      const requestProviders= await fetch(`/api/providers`, requestParameters.json);
      const responseProviders= await requestProviders.json();
      console.log(responseProviders);
      setProviders(responseProviders.providers);
    })();
  }, []);

  return providers;
};