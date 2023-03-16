import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default styled(motion.input)<{area?: string}>`
  grid-area: ${({area}) => area};
`;

