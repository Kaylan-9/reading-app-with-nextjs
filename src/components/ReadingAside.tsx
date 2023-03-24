import { CategoriesContext } from '@/contexts/CategoriesContext';
import Button from '@/styles/Button';
import { ICategory } from '@/types/data/Category';
import { css } from '@emotion/css';
import styled from '@emotion/styled'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'

export interface IReadingAside {
  categories: ICategory[]
  doNotShow?: string[]
};

export interface IOption {
  name: string;
  color?: string;
  onClick: () => void;
};

export const StNav= styled(motion.nav)`
  background-color: rgb(var(--bg));
  border-radius: 1em;
  width: 100%;
  max-width: 1600px;
  padding: 2em 3em !important;
  margin: 0 auto;
  @media(max-width: 700px) {
    padding: 1.5em !important;
    > h2 {margin-bottom: 1em !important;}
  }
  > h2 {margin-bottom: 2em;}
  > ul {
    display: flex;
    flex-flow: row wrap;
    gap: .75em;
  }
`;

export function Option({name, color, onClick}: IOption) {
  return (<li>
    <Button onClick={onClick}>{name}</Button>
  </li>);
};

export default function ReadingAside({categories, doNotShow}: IReadingAside) {
  const router= useRouter();
  const {view}=  useContext(CategoriesContext);

  return (view ? (<aside className={css`
    width: 100%;
  `}>
    <StNav>
      <h2>Categorias</h2>
      <ul>
        <Option color={`rgb(var(--fg))`} name={'todos'} onClick={() => {router.push(`/page/0`);}}/>
        {categories.map(({id, name}: {id: number, name: string}) => {
          const show= doNotShow?.reduce((acc, val) => {
            if(val===name) acc=0;
            else acc++;
            return acc;
          }, 0);
          return show!==0 ? (<Option key={(name+id)} name={name} onClick={() => {
            router.push(`/page/0/${id}`);
          }}/>) : null;
        })}
      </ul>
    </StNav>
  </aside>): null);
};