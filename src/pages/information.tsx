import CookiePolicy from '@/components/sections/CookiePolicy';
import Header from '@/components/sections/header/Header';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';

export const StPresentation = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  > h2 {
    font-family: var(--font-one);
    text-align: center;
    margin-bottom: 1em;
  }
  > p {
    font-family: var(--font-one);
    text-align: justify;
    font-size: 20px;
    text-indent: 40px;
    line-height: 60px;
  }
  @media(max-width:700px) {
    padding: 10px;
    > p {
      min-width: 0px;
      margin: 10px;
    }
  }
`;


export const StAside= styled(motion.aside)`
  nav > ul {
    display: flex;
    flex-flow: column wrap;
    gap: 2em;
    > li {
      cursor: pointer;
      font-size: 1.25em;
      font-weight: bold;
    }
  }
`;

const variants= {
  initial: {y: -50, opacity: 0},
  whileInView: {y: 0, opacity: 1}
}

export interface IAside {
  list: string[];
  setSection: (newValue: number) => void;
  _section: number;
}

export function Aside({ list, setSection, _section }: IAside) {
  return (<StAside>
    <nav><ul>{list.map((name, i) => 
      <li className={_section===i ? css`
        color: var(--secondary-foreground);
      ` : ``} key={name+i} onClick={()=> setSection(i)}>{name}</li>
    )}</ul></nav>
  </StAside>);
}

export function Presentation() {
  return (<StPresentation
    variants={variants}
    initial={`initial`}
    whileInView={`whileInView`}
    transition={{
      delay: .25
    }}
  >
    <h2>Sobre o Website</h2>
    <p><strong>Seja bem vindo ao aplicativo de leitura </strong> um meio confortável e reponsivo aos seus usuários.</p>
    <p>Por meio desta página <strong> WEB </strong> ou  <strong> APP </strong> 🦄🌈 é possível ler histórias em quadrinhos, entretanto, aquelas que estão em domínio publico. Sinta-se a vontade para testar o sistema, e em caso de problemas entre em contanto.</p>
    <a className={`github-profile`} href={`https://github.com/Kaylan-9`}>
      <span>
        <strong>DEV. Kaylan</strong>
      </span>
      <BsGithub/>
    </a>
  </StPresentation>);
}

export default () => {
  const [_section, setSection]= useState(0);
  return (<>
    <Head><title>information</title></Head>
    <Header />
    <main className={css`
      display: grid;
      gap: 1em;
      grid-template-columns: max-content auto;
      padding: 5em 150px;
    `}>
      <Aside list={['sobre', 'cookie policy']} setSection={setSection} _section={_section}/>
      {_section===1 && <CookiePolicy variants={variants} css={css`
        max-width: 700px;
        margin: 0 auto;
        padding: 0;
        > h3 {
          font-size: 30px !important;
          text-align: center;
        }
        > p {
          font-family: var(--font-one);
          margin: 0 auto;
          text-align: justify;
          font-size: 20px;
          text-indent: 40px;
          line-height: 60px;
        }
      `}/>}
      {_section===0 && <Presentation/>}
    </main>
  </>);
};

