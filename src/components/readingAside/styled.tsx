import styled from '@emotion/styled'
import { motion } from 'framer-motion';

export default styled(motion.nav)`
  background-color: rgb(var(--bg));
  border-radius: 1em;
  width: 100%;
  max-width: 1600px;
  padding: 2em 3em !important;
  margin: 0 auto;
  @media(max-width: 700px) {
    padding: 1.5em !important;
    > h2 {margin-bottom: 1em !important;}
  }
  > h2 {margin-bottom: 2em;}
  > ul {
    display: flex;
    flex-flow: row wrap;
    gap: .75em;
  }
`;
