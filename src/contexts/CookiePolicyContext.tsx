import { IPropsCookiePolicy } from "@/types/contexts/CookiePolicy/components/IPropsCookiePolicy";
import requestParameters from "@/utils/requestParameters";
import { createContext, ReactNode, useEffect, useState } from "react";

const initialValueCookiePolicy = {
  agreement: true,
  setAgreement: (newValue: boolean) => null
};

export const CookiePolicyContext = createContext<IPropsCookiePolicy>(initialValueCookiePolicy);

export default function CookiePolicyProvider({children}: {children: ReactNode}) {
  const [agreement, setAgreement] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const agreementReq= await fetch('/api/cookies/acceptedterms', requestParameters.json);
      const agreementRes: {acceptedterms: boolean}= await agreementReq.json();
      setAgreement(agreementRes.acceptedterms);
    })();
  }, [agreement]);

  return (<CookiePolicyContext.Provider value={{agreement, setAgreement}}>
    {children}
  </CookiePolicyContext.Provider>);
};