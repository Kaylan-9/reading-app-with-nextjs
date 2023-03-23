import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default styled(motion.input)<{area?: string}>`
  color: var(--secondary-foreground) !important;
  grid-area: ${({area}) => area};
  cursor: pointer;
`;

