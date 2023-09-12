import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default styled(motion.footer)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2em;
  box-sizing: border-box;
  border-radius: 2em 2em 0 0;
  background-color: rgb(var(--bg));
  margin-top: 20em;
  padding: .5em;
  grid-area: page-footer;
  @media (max-width: 800px) {
    grid-template-columns: auto;
    margin-top: 1em;
    gap: 1em !important;
    border-radius: 0;
    > div {
      padding: 1em !important;
      max-width: 100% !important;
      min-width: 0 !important;
    }
  }
  > div {
    max-width: 500px;
    min-width: 500px;
    box-sizing: border-box;
    border-radius: 1em;
    padding: 2em;
    > h3 {
      font-size: 1.25em !important;
      text-align: center;
      color: var(--secondary-fg);
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

