import { useRef, useState, useCallback, FormEvent, forwardRef } from "react";
import styles from "@/components/components.module.css";
import Link from "next/link";
import useUser from "../lib/useUser";
import { withIronSessionSsr } from "iron-session/next";

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

export const getServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    const user = req.session.user;
    if (user.admin !== true) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        user: req.session.user,
      }
    }
  },
  {
    cookieName: "admlogin",
    password: "complex_password_at_least_32_characters_long",
  }
)

export default function Login({user} : {user: any}) {
  const input_usernameoremail = useRef<HTMLInputElement>(null);
  const input_password = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { mutateUser } = useUser({
    redirectTo: "/about",
    redirectIfFound: true,
  });

  const handleLogin = useCallback(async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const body = {
      name: input_usernameoremail.current?.value,
      password: input_password.current?.value
    };

    try {
      const user = await fetch('api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      mutateUser(
        user,
        false
      );
    } catch(error) {
      // setErrorMsg(error)
      // console.log(error)
    }

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