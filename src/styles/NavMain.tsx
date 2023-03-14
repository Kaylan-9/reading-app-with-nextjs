import styled from "@emotion/styled";
import Column from "./Column";

export const NavMain= styled(Column.withComponent('nav'))`
  grid-area: page-nav;
  margin: 1.5em 1.5em 0 0 !important;
  padding: 0 !important;
`;