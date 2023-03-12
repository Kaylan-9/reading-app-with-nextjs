import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";
import { BiInfoCircle } from 'react-icons/bi';
import { NavItem } from "./NavItem";
import { css } from "@emotion/css";

export const StFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 2em;
  box-sizing: border-box;
  border: 1px var(--border-color) solid;
  border-radius: 1em;
  background-color: var(--quartiary-background);
  margin: 20em 1.5em 1.5em 1.5em;
  padding: 2em;
  grid-area: page-footer;
  > div {
    max-width: 500px;
    min-width: 500px;
    box-sizing: border-box;
    border-radius: 1em;
    padding: 2em;
    > h3 {
      font-size: 1.25em !important;
      text-align: center;
      text-decoration: underline;
      color: var(--secondary-foreground);
    }
    > ul {
      margin-top: 2em !important;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      > li {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
      }
    }
  }
`;

export default function Footer() {
  return (<StFooter className={`page-footer`}>
    <div>
      <h3>Links úteis</h3>
      <ul className={css`
        display: flex;
        flex-flow: column wrap;
        gap: 1.5em;
      `}>
        <NavItem name={`about`} icon={<BiInfoCircle/>} href="about"/>
      </ul>
    </div>

    <div>
      <h3>Desenvolvedores e colaboradores</h3>
      <ul>
        <li>
          <a className={`github-profile`} target={`_blank`} href={`https://github.com/Kaylan-9`}>
            <span>
              <strong>Kaylan</strong>
            </span>
            <BsGithub/>
          </a>
        </li>
      </ul>
    </div>  
  </StFooter>)
}