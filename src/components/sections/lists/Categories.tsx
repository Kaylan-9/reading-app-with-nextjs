import { ICategoriesProps } from '@/types/components/ICategoriesProps';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import * as React from 'react';

export const StCategories = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  padding: 5px 150px 15px 150px;
  background-color: rgb(var(--secondary-background));
  button {
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 30px;
    font-weight: bolder;
    color: var(--secondary-foreground);
    background-color: var(--tertiary-background);
    border: none;
  }
`;

export function Categories ({data}: ICategoriesProps) {
  const router = useRouter();
  return (
    <StCategories>
      {data?.map((profile) => {
        let { name } = profile;
        const link = `/category/${name}`;
        return (<button onClick={() => {
          router.push(link);
        }}>
          {name}
        </button>);
      })}
    </StCategories>
  );
}
