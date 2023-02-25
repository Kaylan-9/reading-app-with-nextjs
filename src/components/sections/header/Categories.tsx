import CategoryButton from '@/styles/components/CategoryButton';
import { ICategoriesProps } from '@/types/components/ICategoriesProps';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import * as React from 'react';

export const StCategories = styled(motion.div)`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  grid-area: categories; 
  padding: 25px 0;
`;

export function Categories ({data}: ICategoriesProps) {
  const router = useRouter();
  const variants= {
    whileInView: {y: 0},
    initial: {y: -50}
  }

  return (
    <StCategories variants={variants} initial={`initial`} whileInView={`whileInView`}>
      {data?.map((profile) => {
        let { name } = profile;
        const link = `/page/category/${name}/0`;
        return (<CategoryButton onClick={() => router.push(link)}>{name}</CategoryButton>);
      })}
    </StCategories>
  );
}
