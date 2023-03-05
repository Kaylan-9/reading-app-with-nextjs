import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";
import { BiInfoCircle } from 'react-icons/bi';
import { NavItem } from "./header/NavItem";
import { css } from "@emotion/css";

export const StFooter = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 2em;
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
  background-color: var(--quartiary-background);
  margin-top: 300px;
  padding: 50px 150px;
  > div {
    max-width: 500px;
    min-width: 500px;
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    border-radius: 1em;
    padding: 2em;
    > h3 {
      text-align: center;
      text-decoration: underline;
    }
    > ul {
      margin-top: 2em !important;
      > li {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
      }
    }
  }
`;

export default function Footer() {
  return (<StFooter>
    <div>
      <h3>Links úteis</h3>
      <ul className={css`
        display: flex;
        flex-flow: column wrap;
        gap: 1.5em;
      `}>
        <NavItem name={`informações`} icon={<BiInfoCircle/>} href="information"/>
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