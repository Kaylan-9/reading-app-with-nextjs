import styled from "@emotion/styled";

export default styled.button`
  padding: .75em;
  font-size: 16px;
  border-radius: 30px;
  font-weight: bolder;
  cursor: pointer;
  color: var(--secondary-foreground);
  background-color: var(--quartiary-background);
  border: none;
  box-shadow: var(--box-shadow);
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) .5s, box-shadow cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
`;