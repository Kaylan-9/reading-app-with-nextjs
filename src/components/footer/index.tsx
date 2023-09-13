import { BsGithub } from "react-icons/bs";
import { NavItem } from "../navItem";
import { css } from "@emotion/css";
import { useTransform, useViewportScroll } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import Footer from './styled';

export default () => {
  const { scrollYProgress } = useViewportScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (<Footer className={`page-footer`} style={{
    scale
  }}>
    <div>
      <h3>Links úteis</h3>
      <ul className={css`
        display: flex;
        flex-flow: column wrap;
        gap: 1.5em;
      `}>
        <NavItem name={`about`} icon={<FaInfoCircle/>} href="about"/>
        
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
  </Footer>)
}