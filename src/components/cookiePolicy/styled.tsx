import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export default styled(motion.div)`
  display: flex;
  align-items: flex-start;
  flex-flow: column wrap;
  gap: 1em;
  padding: 2em 0;
  h2 {
    text-align: center;
    width: 100%;
  }
`;