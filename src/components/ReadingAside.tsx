import CategoryButton from '@/styles/CategoryButton';
import Column from '@/styles/Column';
import { ICategory } from '@/types/data/Category';
import styled from '@emotion/styled'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react'

export interface IReadingAside {
  categories: ICategory[]
  doNotShow?: string[]
};

export interface IOption {
  name: string;
  color?: string;
  onClick: () => void;
};

export const StReadingAside= styled(motion.aside)`
  grid-area: page-reading-aside;
  > nav {
    background-color: rgb(var(--background));
    border-radius: 1em;
    padding: 1em;
    width: 15em;
  }
  margin-right: 1em;
`;

export const StOption= styled(motion.li)<{color?: string}>`
  > button {
    padding: 0px;
    cursor: pointer;
    width: 100%;
    border-radius: initial;
    border-bottom: transparent;
    background-color: transparent;
    color: ${({color}) => color};
    box-shadow: none;
  }
`;

export function Option({name, color, onClick}: IOption) {
  return (<StOption color={color}>
    <CategoryButton onClick={onClick}>{name}</CategoryButton>
  </StOption>);
};

export default function ReadingAside({categories, doNotShow}: IReadingAside) {
  const router= useRouter();
  return (<StReadingAside id={`reading-aside`}>
    <nav>
      <Column>
        <Option color={`rgb(var(--foreground))`} name={'todos'} onClick={() => {router.push(`/page/0`);}}/>
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
      </Column>
    </nav>
  </StReadingAside>)
};