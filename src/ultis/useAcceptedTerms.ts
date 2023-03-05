import React, { useEffect, useState } from 'react'
import requestParameters from './requestParameters';

export default function AcceptedTerms({}) {
  const [ agreement, setAgreement ]= useState<boolean>(true);
  useEffect(()=> {  
    (async () => {
      const acceptedTermsReq= await fetch(`/api/cookies/acceptedterms`, requestParameters.json);
      const acceptedTermsRes: {acceptedterms: boolean}= await acceptedTermsReq.json();
      setAgreement(acceptedTermsRes.acceptedterms);
    })();
  }, [agreement]);

  return agreement;
};