import { css } from "@emotion/css";
import styled from "@emotion/styled";

interface OptionsMenuInterface {
  selection: {
    condi: number;
    func: (indice: number) => void;
  };
  options: {
    name: string,
    onClick: any
  }[];
}

const OptionsMenuSt = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 75px 0px;
  & > li > button {
    background-color: transparent;
    cursor: pointer;
    color: white;
    font-family: 'Roboto', sans-serif !important;
    font-size: 16px;
    border: none;
    padding: 15px 30px;
  }   
`;


export default function OptionsMenu({selection, options} : OptionsMenuInterface) {
  return (<OptionsMenuSt>
    {options.map((option, indice) => {
      return (<li key={option.name+indice}>
        <button 
          className={selection.condi===indice ? css`
            border-radius: 0 0 15px 15px;
            background-color: rgb(22 22 22) !important;
            box-shadow: 0px 37.5px 50px 1px rgba(0, 0, 0, 0.5);
          ` : ''}
          onClick={() => {              
            selection.func(indice);
            option.onClick();
          }}
        >
          {option.name}
        </button>
      </li>);
    })}
  </OptionsMenuSt>);
}
