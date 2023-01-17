import Header from "@/components/Header";
import styles from '../../components/components.module.css';

export default function About() {

  return (<div>
    <Header/>
    <main className={styles.abouttext}>
      <h2>Sobre</h2>
      <p>Seja bem vindo ao aplicativo de leitura, esta aplicação foi desenvolvida com o intuito de ser rápido, prática e confortável aos seus 🦉 usuários.</p>
      <p>O desenvolvedor responsável: .</p>
    </main>
  </div>);
}