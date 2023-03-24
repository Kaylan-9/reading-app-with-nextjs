import styled from "@emotion/styled";
import { motion } from "framer-motion";

export interface IButton {
  area?: string;
  color?: string;
};

const Button= styled(motion.button)<IButton>`
  border: none;
  font-family: var(--font-one);
  cursor: pointer;
  color: var(--secondary-fg) !important;
  grid-area: ${({area}) => area};
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) .5s, box-shadow cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
  background-color: rgb(var(--secondary-bg)) !important;
  border-radius: 1em;
  padding: 1em;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 1em;
  justify-content: center;
  > svg {font-size: 1.2em;}
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
  @media (max-width: 700px) {
    padding: .85em;
  }
`;

export const ViewerOption= styled(Button)`
  background-color: var(--fifth-bg) !important;
  border-radius: 100%;
  color: var(--fg) !important;
  padding: .6em;
  @media(max-width: 800px){
    background-color: transparent !important;
    padding: 0em;
  }
`;

export const InputBtn= styled(Button.withComponent('input'))``;
export default Button;