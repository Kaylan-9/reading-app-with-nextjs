import { useRef, useCallback, FormEvent, useContext, MouseEvent } from "react";
import InputLabel from "@/components/ultis/InputLabel";
import { SessionContext, SessionContextInterface } from "@/contexts/SessionContext";
import styled from "@emotion/styled";

const LoginSt = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 1000;
  form {
    transition: left 1s;
    position: relative;
    transform: translateX(-100%);
    display: flex;
    left: 100%;
    flex-direction: column;
    gap: 30px;
    max-width: 450px; 
    width: 100%;
    background-color: #1d1d1d;
    padding: 40px 30px !important;
    min-height: 100vh;
    align-items: center;
    @keyframes Openlogin {
      0% {
        left: calc(100% + 200px);
      }
      100% {
        left: 100%;
      }
    } 
    animation: 1s Openlogin cubic-bezier(0.3, 0.05, 0.795, 0.035);
    div {
      gap: 12px !important;
      input[type=text] {
        padding: 15px !important;
      }
    }
    input[type="button"] {
      padding: 15px 30px;
      border-radius: 30px;
      border: none;
      background-color: #2e2b2b !important;
      color: white;
      font-weight: bold;
      font-family: var(--font-one);
      font-size: 15px;
      cursor: pointer;
    }
  }  
`;

export default function Login({setActiveLogin}: {setActiveLogin: (state: boolean) => void}) {
  const input_usernameoremail = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);
  const { handleLogIn: _Login, userSession } = useContext<SessionContextInterface>(SessionContext);
  const handleLogin = useCallback(async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();  
    if(input_password.current!==null && input_usernameoremail.current!==null) {
      _Login({
        name: input_usernameoremail.current?.value,
        password: input_password.current?.value
      });
    }
  }, []);

  return (<LoginSt onClick={(e: MouseEvent<HTMLDivElement>) => {
    const {clientX} = e;
    const leftForm = e.currentTarget.querySelector('form')?.getBoundingClientRect().left ?? false;
    if(leftForm && clientX<leftForm) setActiveLogin(false);
  }}>
    <form>
      <h3>Login</h3>  
      <InputLabel ref={input_usernameoremail} label="usuário" placeholder="nome ou @e-mail de entrada" area={`usernameoremail`}/>
      <InputLabel ref={input_password} type='password' label="senha" area={`userpassword`}/>
      <input type="button" onClick={handleLogin} value="Logar"/>
    </form>
  </LoginSt>);
}