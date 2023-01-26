import { useContext } from "react";
import Header from "@/components/sections/Header";
import { SessionContext } from "@/contexts/SessionContext";
import Head from "next/head";
import { css } from "@emotion/css";

const AboutPage = css`
  margin-top: 80px;
  & > h2 {
    font-family: var(--font-one);
    margin: 50px 0px !important;
    text-align: center;
  }
  & > p {
    font-family: var(--font-one);
    margin: 0 auto;
    max-width: 700px;
    text-align: justify;
    font-size: 20px;
    text-indent: 40px;
    line-height: 60px;
  }
  @media(max-width:700px) {
    padding: 10px;
    & > p {
      min-width: 0px;
      margin: 10px;
    }
  }
  @media(min-width:700px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function About() {
  const { userSession } = useContext<any>(SessionContext);

  console.log(userSession)
  return (<>
    <Head>
      <title>Reading App About</title>
    </Head>
    <div>
      <Header/>
      <main className={AboutPage}>
        <h2>Sobre</h2>
        <p>
          <strong>Seja bem vindo ao aplicativo de leitura </strong> um meio confortável e reponsivo aos seus usuários.
        </p>
        <p>Por meio desta página <strong> WEB </strong> ou  <strong> APP </strong> 🦄🌈 é possível ler histórias em quadrinhos, entretanto, aquelas que estão em domínio publico. Sinta-se a vontade para testar o sistema, e em caso de problemas entre em contanto.</p>
        <p>
          <strong>DEV. Kaylan 🐺</strong> 
        </p>
      </main>
    </div>
  </>);
}