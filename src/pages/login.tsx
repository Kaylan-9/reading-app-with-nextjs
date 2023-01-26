import { useRef, useCallback, FormEvent, useContext } from "react";
import styles from "@/components/components.module.css";
import InputLabel from "@/components/ultis/InputLabel";
import Link from "next/link";
import { SessionContext } from "@/contexts/SessionContext";
import Head from "next/head";
import { css } from "@emotion/css";

const LoginPage = css`
  min-height: 100vh;
  & > .containerform {
    display: flex;
    flex-direction: column;
    gap: 50px;
    max-width: 400px;
    width: 100%;
    background-color: #333333;
    padding: 50px 35px;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & > form { 
      display: flex !important;
      flex-direction: column !important;
      gap: 45px;
      align-items: center;
      > input[type="button"] {
        padding: 8px 16px;
        border-radius: 30px;
        border: none;
        background-color: #1d1d1d;
        color: white;
        font-weight: bold;
        font-family: var(--font-one);
        font-size: 15px;
      }
    }
    & > .backbtn {
      background-color: rgb(185, 185, 185);
      border-radius: 30px;
      padding: 12px 30px;
      display: inline-block;
      margin: 15px;
      text-align: center;
      & > a {
        text-decoration: none;
        color:  rgb(0, 0, 0);
        font-family: var(--font-one);
        font-weight: bold;
        font-size: 18px;
      }
    }
  } 
`;

export default function Login() {
  const input_usernameoremail = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);
  const { handleLogin: _Login, userSession } = useContext<any>(SessionContext);
  const handleLogin = useCallback(async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();  
    _Login({
      name: input_usernameoremail.current?.value,
      password: input_password.current?.value
    });
  }, []);

  return (<>
    <Head>
      <title>Reading App Login</title>
    </Head>
    <div className={styles.pagelogin}>
      <div className={styles.backbtn}>
        <Link href="/">Voltar</Link>
      </div>
      <div className={styles.containerform}>
        <h2>Login de administrador</h2>
        <form>
          <InputLabel ref={input_usernameoremail} label="usuário" placeholder="nome ou @e-mail de entrada" area={`usernameoremail`}/>
          <InputLabel ref={input_password} label="senha" area={`userpassword`}/>
          <input type="button" onClick={handleLogin} value="Logar"/>
        </form>
      </div>
    </div>
  </>);
}