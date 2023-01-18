import { useRef, useCallback, FormEvent, forwardRef, useContext, useEffect } from "react";
import styles from "@/components/components.module.css";
import Link from "next/link";
import { SessionContext } from "@/contexts/SessionContext";
import Router from "next/router";

type InputLabelType = {
  label: string,
  placeholder?: string,
}

const InputLabel = forwardRef(({label, placeholder=""}: InputLabelType, ref: any) => {
  return (<div className={styles.inputlabel}>
    <label>{label}</label>
    <input type="text" placeholder={placeholder} ref={ref}/>
  </div>);
});

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

  const verifyLogin = useCallback(() => {
    if(userSession.isLoggedIn) {
      Router.push("/");
    }
  }, [userSession]);

  useEffect(() => {
    verifyLogin();
  }, []);

  return (<div className={styles.pagelogin}>
    <div className={styles.backbtn}>
      <Link href="/">Voltar</Link>
    </div>
    <div className={styles.containerform}>
      <h2>Login de administrador</h2>
      <form>
        <InputLabel ref={input_usernameoremail} label="usuário" placeholder="nome ou @e-mail de entrada"/>
        <InputLabel ref={input_password} label="senha"/>
        <input type="button" onClick={handleLogin} value="Logar"/>
      </form>
    </div>
  </div>);
}