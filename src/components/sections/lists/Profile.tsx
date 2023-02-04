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
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export function Profile ({link, name, image}: IProfilesProps) {
  const router = useRouter();
  return (<StProfile onClick={() => {
    router.push(link);
  }}>
    <ProfilePic width='50px' min_height='50px' imgurl={image}/>
    <label>{name}</label>
  </StProfile>);
}
