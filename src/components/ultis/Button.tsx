import styled from "@emotion/styled";

const Button = styled.input<{area: string}>`
  padding: 8px 16px;
  border-radius: 30px;
  border: none;
  background-color: var(--tertiary-background);
  color: white;
  font-weight: bold;
  font-family: var(--font-one);
  font-size: 15px;
  grid-area: ${({area}) => area};
`;

export default Button;