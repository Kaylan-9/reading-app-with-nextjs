import { motion } from 'framer-motion';
import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";

export const StFooter = styled.footer`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
  margin-top: 300px;
  padding: 50px 0;
`;

export default function Footer() {
  return (<StFooter id={`about`}>
  </StFooter>)
}