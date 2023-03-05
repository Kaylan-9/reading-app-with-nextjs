import { ICategory } from '@/types/data/Category';
import styled from '@emotion/styled'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react'

export interface IReadingAside {
  categories: ICategory[]
};

export interface IOption {
  name: string;
  onClick: () => void;
};

export const StReadingAside= styled(motion.aside)`
  
`;

export const StOption= styled(motion.li)`
  > button {
    cursor: pointer;
  }
`;

export function Option({name, onClick}: IOption) {
  return (<StOption>
    <button onClick={onClick}>{name}</button>
  </StOption>);
};

export default function ReadingAside({categories}: IReadingAside) {
  const router= useRouter();
  return (<StReadingAside>
    <nav>
      <ul>
        {categories.map(({id, name}: {id: number, name: string}) => {
          return (<Option key={(name+id)} name={name} onClick={() => {
            router.push(`/page/category/${id}/0`);
          }}/>);
        })}
      </ul>
    </nav>
  </StReadingAside>)
};