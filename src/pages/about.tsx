import CookiePolicy from '@/components/CookiePolicy';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Button from '@/styles/Button';
import Column from '@/styles/Column';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { BsGithub } from 'react-icons/bs';

export const StPresentation = styled(motion.div)`
  margin: 0 auto;
  padding: 1em;
  background-color: rgb(var(--background));
  border-radius: 1em;
  > h2 {
    text-align: center !important;
    width: 100% !important;
  }
  > p {
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
  grid-area: page-aside;
  background-color: rgb(var(--background));
  border-radius: 1em;
  width: 100%;
  padding: 2em 3em !important;
  nav > ul {
    display: flex;
    flex-flow: row wrap;
    gap: 2em;
  }
`;

const Option= styled(Button.withComponent('button'))<{color?: string}>`
  color: ${({color}) => color};
  background-color: rgb(var(--secondary-background)) !important;
  box-shadow: none !important;
  border-radius: 1em;
  padding: 1em;
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
    <nav>
      <ul>{list.map((name, i) => 
        <li key={name+i}>
          <Option className={_section===i ? css`color: white !important;` : ``} key={name+i} onClick={()=> setSection(i)}>
            {name}
          </Option>       
        </li>
      )}</ul>
    </nav>
  </StAside>);
}

Aside.displayName= 'Aside';

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

Presentation.displayName= 'Presentation';

export default function About() {
  const [_section, setSection]= useState(0);
  return (<>
    <Head><title>information</title></Head>
    <Header/>
    <Main>
      <Aside list={['sobre', 'cookie policy']} setSection={setSection} _section={_section}/>
      {_section===1 && <CookiePolicy variants={variants} css={css`
        padding: 1em;
        border-radius: 1em;
        background-color: rgb(var(--background)) !important;
        width: 1fr !important;
        margin: 0 !important;
        > p {
          margin: 0 auto;
          font-size: 20px;
          text-indent: 40px;
          line-height: 60px;
        }
      `}/>}
      {_section===0 && <Presentation/>}
    </Main>
  </>);
};

