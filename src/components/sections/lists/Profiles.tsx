import IProfile from '@/types/IProfile';
import styled from '@emotion/styled';
import * as React from 'react';
import { Profile } from './Profile';

export interface IProfilesProps {
  data: IProfile[];
}

export const StProfiles = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  padding: 25px 0 0 0;
`;

export function Profiles ({data}: IProfilesProps) {

  return (
    <StProfiles>
      {data?.map((profile, indice: number) => {
        let {id, name, image} = profile;
        const link = `/user/@${id}`;
        return (<Profile link={link} name={name} image={image}/>);
      })}
    </StProfiles>
  );
}
