import TReadingAside, { TOption } from './type';
import Nav from './styled';
import { CategoriesContext } from '@/contexts/CategoriesContext';
import Button from '@/styles/Button';
import { css } from '@emotion/css';

import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export const Option = ({name, color, onClick}: TOption) => (<li>
    <Button onClick={onClick}>{name}</Button>
</li>);

export default ({categories, doNotShow}: TReadingAside) => {
  const router= useRouter();
  const {view}=  useContext(CategoriesContext);

  return (view ? (<aside className={css`
    width: 100%;
  `}>
    <Nav>
      <h2>Categorias</h2>
      <ul>
        <Option color={`rgb(var(--fg))`} name={'todos'} onClick={() => {router.push(`/page/0`);}}/>
        {categories.map(({id, name}: {id: number, name: string}) => {
          const show= doNotShow?.reduce((acc: number, val: string) => {
            acc= (val===name) ? 0 : acc+1;
            return acc;
          }, 0);
          return show!==0 ? (<Option key={(name+id)} name={name} onClick={() => {
            router.push(`/page/0/${id}`);
          }}/>) : null;
        })}
      </ul>
    </Nav>
  </aside>): null);
};