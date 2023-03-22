import Column from "@/styles/Column"
import styled from "@emotion/styled"

const Main= styled(Column)`
  grid-area: page-main;
  align-items: center;
  padding: 0 2rem !important; 
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 100%;
  > * {
    width: 100%;
    max-width: 1600px;
  }
`;

export default Main;