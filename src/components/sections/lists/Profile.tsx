import IProfile from '@/types/IProfile';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import * as React from 'react';
import ProfilePic from '../ProfilePic';

export interface IProfilesProps extends IProfile {
  link: string
}

export const StProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 75px 0;
  cursor: pointer;
`;

export function Profile ({link, name, image}: IProfilesProps) {
  const router = useRouter();
  return (<StProfile onClick={() => {
    router.push(link);
  }}>
    <ProfilePic width='100px' min_height='100px' imgurl={image}/>
    <label>{name}</label>
  </StProfile>);
}
