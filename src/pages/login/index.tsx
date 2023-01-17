import styles from "../../components/components.module.css";
import Link from "next/link";
import { forwardRef } from "react";

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
  return (<div className={styles.pagelogin}>
    <Link className={styles.backbtn} href="/">Voltar</Link>
    <div>
      <h2>Login de administrador</h2>
      <form action="" method="post">
        <InputLabel label="usuário" placeholder="nome ou @e-mail de entrada"/>
        <InputLabel label="senha"/>
        <button>Logar</button>
      </form>
    </div>
  </div>);
}