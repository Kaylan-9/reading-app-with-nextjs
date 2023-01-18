import { useContext } from "react";
import Header from "@/components/Header";
import styles from '@/components/components.module.css';
import { SessionContext } from "@/contexts/SessionContext";

export default function About() {
  const { userSession } = useContext<any>(SessionContext);

  console.log(userSession)
  return (<div>
    <Header/>
    <main className={styles.abouttext}>
      <h2>Sobre</h2>
      <p>Seja bem vindo ao aplicativo de leitura, esta aplicação foi desenvolvida com o intuito de ser rápido, prática e confortável aos seus 🦉 usuários.</p>
      <p>O desenvolvedor responsável: {userSession.userdata.name}.</p>
    </main>
  </div>);
}