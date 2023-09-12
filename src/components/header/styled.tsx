import Column from "@/styles/Column";
import styled from "styled-components";

export default styled(Column.withComponent('header'))`
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  margin: 0!important;
  padding: 0.75em 2em !important;
  margin-bottom: 1.5em !important;
  column-gap: 1.5em !important;
  grid-area: page-header;
  background-color: rgb(var(--bg));
  @media (max-width: 700px) {
    justify-content: center;
    margin-bottom: 1em !important;
  }
  > .search {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: search;
    border-radius: 30px;
    > .category {
      border-radius: 0 30px 30px 0;
      background-color: transparent;
    }
    > .input-icon {
      align-items: center;
      display: flex;
      grid-area: inputicon;
      font-size: 25px;
      border-radius: 30px 0 0 30px;
      padding-left: 15px;
      gap: 15px;
      @media(max-width:700px) {
        display: grid;
        grid-template-columns: auto auto;
      }
      > input {
        border: none;
        background-color: transparent;
        padding: 15px;
        font-family: var(--font-one);
        color: var(--secondary-fg);
        min-width: 250px;
        outline: none;
        &::-webkit-input-placeholder {
          color: white;
        }
      }
      > svg {
        min-width: 18px;
        cursor: pointer;
        > * {
          color: var(--secondary-fg);
        }
      }
    }
  }
`;

export const Items = styled(Column)`
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  grid-area: headeritems;
  column-gap: 1.5em;
  padding: 0!important;
  @media(max-width: 700px) {
    gap: .75em !important;
  }
`;

