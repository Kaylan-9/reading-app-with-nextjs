import CategoryButton from '@/styles/CategoryButton';
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
  onClick: () => void;
};

export const StReadingAside= styled(motion.aside)`
  grid-area: page-aside;
  margin-right: 2.5em;
  > nav {
    padding: 2em;
    background-color: var(--quartiary-background);
    border: 1px var(--border-color) solid;
    border-radius: 1em;
    > ul {
      display: flex;
      flex-flow: column wrap;
      gap: 1em;
    }
  }
`;

export const StOption= styled(motion.li)`
  min-width: 200px;
  > button {
    cursor: pointer;
    width: 100%;
    border-radius: initial;
    border-bottom: transparent;
    background-color: transparent;
    box-shadow: none;
  }
`;

export function Option({name, onClick}: IOption) {
  return (<StOption>
    <CategoryButton onClick={onClick}>{name}</CategoryButton>
  </StOption>);
};

export default function ReadingAside({categories, doNotShow}: IReadingAside) {
  const router= useRouter();
  return (<StReadingAside id={`reading-aside`}>
    <nav>
      <ul>
        {categories.map(({id, name}: {id: number, name: string}) => {
          const show= doNotShow?.reduce((acc, val) => {
            if(val===name) acc=0;
            else acc++;
            return acc;
          }, 0);
          return show!==0 ? (<Option key={(name+id)} name={name} onClick={() => {
            router.push(`/page/category/${id}/0`);
          }}/>) : null;
        })}
      </ul>
    </nav>
  </StReadingAside>)
};