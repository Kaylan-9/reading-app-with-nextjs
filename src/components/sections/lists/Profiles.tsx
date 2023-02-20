import { IProfilesProps } from '@/types/components/IProfilesProps';
import styled from '@emotion/styled';
import * as React from 'react';
import { Profile } from './Profile';

export const StProfiles = styled.div`
  display: flex;
  gap: 25px;
  padding: 5px 150px 15px 150px;
  background-color: rgb(var(--secondary-background));
`;

export function Profiles ({data}: IProfilesProps) {

  return (
    <StProfiles>
      {data?.map((profile, indice: number) => {
        let {id, name, image} = profile;
        const link = `/user/@${id}`;
        return (<Profile 
          key={link} 
          link={link} 
          name={name} 
          image={image}
        />);
      })}
    </StProfiles>
  );
}
