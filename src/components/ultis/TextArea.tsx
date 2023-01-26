import styled from "@emotion/styled";

const TextArea = styled.textarea<{area: string}>`
  width: 100%;
  padding: 15px;
  background-color: #292929;
  color: #ffffff;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  outline: none;
  grid-area: ${({area}) => area};
`;

export default TextArea;