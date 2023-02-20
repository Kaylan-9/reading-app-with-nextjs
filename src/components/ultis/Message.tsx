import { IMessageProps } from '@/types/components/ultis/ImessageProps';
import styled from '@emotion/styled';
import * as React from 'react';

const MessageSt = styled.article`
  margin: 20px;
  margin-left: 0px;
  border-radius: 22px;
  background-color: black;
  padding: 10px;
`;

export function Message({ text }: IMessageProps) {
  return (
    <MessageSt>
      {text}
    </MessageSt>
  );
}
