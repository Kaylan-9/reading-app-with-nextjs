import { css } from "@emotion/css";
import Router, { useRouter } from "next/router";
import { createContext, useReducer, ReactNode, useEffect, useCallback, useContext } from "react";
import { ModalContext } from "./ModalContext";

export type UserDataType = {
  id?: number,
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
  const router = useRouter();
  const {handleModal} = useContext(ModalContext);
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
      return;
    } 
    if(router.asPath === '/profile') router.push('/');
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
        handleModal({type: 'add', newModal: {message: '😈👽🤖 Logado com sucesso!!'}});
        sessionStorage.setItem("userdata", JSON.stringify(userdata));
        handleUserSession({type: "login", userdata}); 
      } else {
        handleModal({type: 'add', newModal: {message: '😑 Usuário não encontrado!?'}});
      }
    } catch(error) {
      handleModal({type: 'add', newModal: {message: (
        <p className={css`color: #ff0040;`}>💣 @Falha ao logar !</p>
      )}});
    }
  }, [handleUserSession, handleModal]);

  const handleLogOut = useCallback(async () => {
    try {
      if(userSession.userdata!==null) {
        sessionStorage.removeItem("userdata");
        handleModal({type: 'add', newModal: {message: '🔒 Usuário desconectado!?'}});
        handleUserSession({type: "logout"}); 
      }
    } catch(error) {
      console.log(error);
      handleModal({type: 'add', newModal: {message: '📐'}});
    }
  }, [handleUserSession, handleModal]);

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