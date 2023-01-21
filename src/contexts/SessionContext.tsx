import Router from "next/router";
import { createContext, useReducer, ReactNode, useEffect, useCallback } from "react";

export type UserDataType = {
  name: string | false,
  password: string | false
}

export interface SessionInterface {
  message: string | false,
  isLoggedIn: boolean,
  userdata: UserDataType
}

export interface SessionContextInterface {
  handleLogin: () => void;
  handleUserSession: any;
  userSession: SessionInterface;
}

const initialValueSessionContext = {
  handleLogin: () => null,
  handleUserSession: () => null,
  userSession: {
    isLoggedIn: false,
    userdata: {
      name: false,
      password: false
    }
  }
};

export const sessionReducer = (state: any, action: any) => {
  let { isLoggedIn, userdata } = state;
  if(action.type === "login") {
    isLoggedIn = true;
    userdata = action.userdata;
  }
  return { isLoggedIn, userdata };
}

export const SessionContext: any = createContext(initialValueSessionContext);

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [userSession, handleUserSession] = useReducer(sessionReducer, initialValueSessionContext.userSession);
  const areYouLoggedIn = useCallback(async () => {
    let getStorage: unknown | SessionInterface = sessionStorage.getItem("userdata");
    if(typeof getStorage === 'string') {
      try {
        getStorage = JSON.parse(getStorage);
        const result = handleLogin(getStorage);
        console.log(result);
      } catch(error) {
        console.log(error);
      }
    }
  }, []);

  const handleLogin = useCallback(async (body: UserDataType | any) => {
    try {
      const reqParams = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      };
      const response = await fetch('/api/login',  reqParams);
      const userdata = response.json();
      if(userdata!=null) {
        sessionStorage.setItem("userdata", JSON.stringify(body));
        handleUserSession({type: "login", userdata: body}); 
        Router.push("/");
      }
    } catch(error) {
      console.log(error);
    }
  }, [handleUserSession]);

  useEffect(() => {
    areYouLoggedIn();
  }, [])
  
  return <SessionContext.Provider value={{
    handleLogin, 
    handleUserSession, 
    userSession
  }}>{children}</SessionContext.Provider>;
};