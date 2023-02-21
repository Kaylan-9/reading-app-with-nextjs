import styled from "@emotion/styled";

export default styled.button`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 30px;
  font-weight: bolder;
  cursor: pointer;
  color: var(--secondary-foreground);
  background-color: #f7f7f7;
  border: none;
  box-shadow: 0px 0px 5px 1px rgb(0 0 0 / 39%);
  transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) .5s, box-shadow cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
  &:hover {
    background-color: transparent;
    box-shadow: none;
  }
`;