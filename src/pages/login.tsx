import { useRef, useState, useCallback, FormEvent, forwardRef } from "react";
import styles from "../../components/components.module.css";
import Link from "next/link";
import useUser from "../lib/useUser";

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
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { mutateUser } = useUser({
    redirectTo: "/about",
    redirectIfFound: true,
  });

  const handleLogin = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const body = {
      usernameoremail: input_usernameoremail.current,
      password: input_password.current
    };

    try {
      mutateUser(
        await fetch('api/login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
        false
      );
    } catch(error) {
      // setErrorMsg(error)
      // console.log(error)
    }

  };

  return (<div className={styles.pagelogin}>
    <div className={styles.backbtn}>
      <Link href="/">Voltar</Link>
    </div>
    <div className={styles.containerform}>
      <h2>Login de administrador</h2>
      <form>
        <InputLabel ref={input_usernameoremail} label="usuário" placeholder="nome ou @e-mail de entrada"/>
        <InputLabel ref={input_password} label="senha"/>
        <input type="submit" onSubmit={handleLogin} value="Logar"/>
      </form>
    </div>
  </div>);
}