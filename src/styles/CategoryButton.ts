import styled from "@emotion/styled";
import Button from "./Button";

export default styled(Button.withComponent('button'))`
  color: var(--secondary-foreground);
  box-shadow: var(--box-shadow);
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) .5s, box-shadow cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
`;