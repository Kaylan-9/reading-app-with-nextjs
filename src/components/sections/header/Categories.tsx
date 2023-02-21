import CategoryButton from '@/styles/components/CategoryButton';
import { ICategoriesProps } from '@/types/components/ICategoriesProps';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import * as React from 'react';

export const StCategories = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 1rem;
  grid-area: categories; 
  padding: 25px 0;
`;

export function Categories ({data}: ICategoriesProps) {
  const router = useRouter();
  return (
    <StCategories>
      {data?.map((profile) => {
        let { name } = profile;
        const link = `/category/${name}`;
        return (<CategoryButton onClick={() => router.push(link)}>{name}</CategoryButton>);
      })}
    </StCategories>
  );
}
