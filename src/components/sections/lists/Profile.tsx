import { IProfileProps } from '@/types/components/IProfileProps';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import * as React from 'react';
import ProfilePic from '../ProfilePic';

export const StProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  & > label {
    font-weight: bolder;
  }
`;

export function Profile ({link, name, image}: IProfileProps) {
  const router = useRouter();
  return (<StProfile onClick={() => {
    router.push(link);
  }}>
    <ProfilePic width='50px' min_height='50px' imgurl={image}/>
    <label>{name}</label>
  </StProfile>);
}
