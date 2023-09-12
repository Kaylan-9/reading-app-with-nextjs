import { motion } from "framer-motion";
import styled from "styled-components";

export default styled(motion.div)`
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(var(--bg));
  border-radius: 1em;
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 1.5em;
    > h2 { 
      margin-bottom: 1.5em;
    }
  }
  > h2 {
    text-align: center;
    background: white;
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex !important;
    align-items: center;
    gap: 1.5rem;
    a {
      color: var(--secondary-fg) !important;
      font-weight: lighter;
      font-size: .8em;
      text-decoration: var(--secondary-fg) underline  !important;
    }
  }
`;

export const ComicsGrid= styled.ul`
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
  row-gap: 3rem;
  column-gap: 1vw;
  width: 100%;
  padding: 0 50px;
  > li {
    margin: 0 auto;    
    cursor: pointer;
  }
  @media (max-width: 700px) {
    grid-template-columns: auto;
    min-width: 100%;
    row-gap: 2rem !important;
    justify-content: center !important;
    > li {
      margin: 0 !important; 
    }
  }
`;