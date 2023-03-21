import styled from "@emotion/styled";
import { BsGithub } from "react-icons/bs";
import { BiInfoCircle } from 'react-icons/bi';
import { NavItem } from "./NavItem";
import { css } from "@emotion/css";
import { motion, useTransform, useViewportScroll } from "framer-motion";

export const StFooter = styled(motion.footer)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2em;
  box-sizing: border-box;
  border-radius: 2em 2em 0 0;
  background-color: rgb(var(--background));
  margin-top: 20em;
  padding: .5em;
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
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (<StFooter className={`page-footer`} style={{
    scale
  }}>
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
            <span><strong>Kaylan</strong></span>
            <BsGithub/>
          </a>
        </li>
      </ul>
    </div>  
  </StFooter>)
}