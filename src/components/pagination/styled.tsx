import styled from "styled-components";

export default styled.nav`
  width: 100%;
  grid-area: pagination;
  padding: 1.5em 0;
  & > ul {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
    & > li {
      .marked {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
`;

export const PageButton= styled.button`
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 20px 0px #00000032;
  background-color: var(--quartiary-bg);
  border: solid var(--border-color) 1px;
  color: var(--secondary-fg);
  font-size: 17px;
  padding: 10px;
  border-radius: 30px;
  min-width: 45px;
  height: 45px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;