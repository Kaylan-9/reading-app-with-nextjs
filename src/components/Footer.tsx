import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";
import { BiInfoCircle } from 'react-icons/bi';
import { NavItem } from "./sections/header/NavItem";
import { css } from "@emotion/css";

export const StFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  box-sizing: border-box;
  box-shadow: var(--box-shadow);
  margin-top: 300px;
  padding: 50px 150px;
  > div {
    box-sizing: border-box;
    > h4 {
      text-align: center;
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
      <h4>
        Links úteis
      </h4>
      <ul className={css`
        display: flex;
        flex-flow: column wrap;
        gap: 1.5em;
      `}>
        <NavItem name={`informações`} icon={<BiInfoCircle/>} href="information"/>
      </ul>
    </div>

    <div>
      <h4>
        Desenvolvedores e colaboradores
      </h4>
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