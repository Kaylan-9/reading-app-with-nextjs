import Header from "@/components/sections/Header";
import Head from "next/head";
import { css } from "@emotion/css";
import { AboutText } from "@/components/sections/AboutText";

const AboutPage = css`
  margin-top: 80px;
  & > h2 {
    font-family: var(--font-one);
    margin: 50px 0px !important;
    text-align: center;
  }
  @media(min-width:700px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function About() {
  return (<>
    <Head>
      <title>Reading App About</title>
    </Head>
    <div>
      <Header/>
      <main className={AboutPage}>
        <h2>Sobre</h2>
        <AboutText/>
      </main>
    </div>
  </>);
}