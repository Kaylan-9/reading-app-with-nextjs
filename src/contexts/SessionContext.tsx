import Router, { useRouter } from "next/router";
import { createContext, useReducer, ReactNode, useEffect, useCallback } from "react";

export type UserDataType = {
  name: string,
  password: string
}

export interface SessionInterface {
  message?: string | false,
  isLoggedIn: boolean,
  userdata: UserDataType | null
}

export interface SessionContextInterface {
  handleLogIn: (body: UserDataType | null) => void;
  handleLogOut: () => void;
  handleUserSession: any;
  userSession: SessionInterface;
}

const initialValueSessionContext = {
  handleLogIn: () => null,
  handleLogOut: () => null,
  handleUserSession: () => null,
  userSession: {
    isLoggedIn: false,
    userdata: null
  }
};

export const sessionReducer = (state: any, action: any) => {
  let { isLoggedIn, userdata } = state;
  if(action.type === "login") {
    isLoggedIn = true;
    userdata = action.userdata;
  } else if(action.type === "logout") {
    isLoggedIn = false;
    userdata = null;
  }
  return { isLoggedIn, userdata };
}

export const SessionContext: any = createContext(initialValueSessionContext);

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [userSession, handleUserSession] = useReducer(sessionReducer, initialValueSessionContext.userSession);
  const areYouLoggedIn = useCallback(async () => {
    let getStorage: string | null | SessionInterface = sessionStorage.getItem("userdata");
    if(typeof getStorage === 'string') {
      try {
        getStorage = JSON.parse(getStorage) as SessionInterface;
        if(getStorage.userdata!==undefined && getStorage.userdata!==null) 
          handleLogIn(getStorage.userdata);
      } catch(error) {
        console.log(error);
      }
    }
  }, []);

  const handleLogIn = useCallback(async (body: UserDataType) => {
    try {
      const reqParams = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };
      const response = await fetch('/api/login',  reqParams);
      const userdata = await response.json();

      console.log(userdata);
      if(userdata!==null) {
        sessionStorage.setItem("userdata", JSON.stringify(body));
        handleUserSession({type: "login", userdata: body}); 
      }
    } catch(error) {
      console.log(error);
    }
  }, [handleUserSession]);

  useEffect(() => {
    areYouLoggedIn();
  }, []);

  const handleLogOut = useCallback(async () => {
    try {
      if(userSession.userdata!==null) {
        sessionStorage.removeItem("userdata");
        handleUserSession({type: "logout"}); 
      }
    } catch(error) {
      console.log(error);
    }
  }, [handleUserSession]);

  useEffect(() => {
    areYouLoggedIn();
  }, [])
  
  
  return <SessionContext.Provider value={{
    handleLogIn, 
    handleLogOut, 
    handleUserSession, 
    userSession
  }}>{children}</SessionContext.Provider>;
};