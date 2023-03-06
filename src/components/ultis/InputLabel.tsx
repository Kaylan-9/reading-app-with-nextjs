import { forwardRef } from "react";
import styled from "@emotion/styled";
import { IInputLabel } from "@/types/components/ultis/IInputLabel";
import Input from "@/styles/Input";

const InputLabelSt = styled.div<{area: string}>`
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  grid-area: ${({area}) => area};
  & > label {
    font-weight: bold;
    border: none;
  }
`;

const InputLabel = forwardRef(({label, type="text", placeholder="", area}: IInputLabel, ref: any) => {
  return (<InputLabelSt area={area}>
    <label>{label}</label>
    <Input type={type} placeholder={placeholder} ref={ref}/>
  </InputLabelSt>);
});

InputLabel.displayName = "InputLabel";

export default InputLabel;