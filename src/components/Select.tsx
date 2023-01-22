import styled from "@emotion/styled";
import { useState } from "react";
import { IoIosArrowForward } from 'react-icons/io';

interface SelectInterface {
  optionCapture: unknown;
}

const SelectSt = styled.div`
  border-radius: 5px;
  border: none;
  grid-area: bookcategorieselect;
  text-align: center;
  background-color: #0c0c0c;
  border-radius: 15px;
  > #select-button, > .optionlist > .option {
    font-family: 'Roboto', sans-serif !important;
    cursor: pointer;
  }
  .optionlist {
    margin-top: 10px;
    position: absolute;
    background-color: #0c0c0c;
    border-radius: 15px;
    .option {
      padding: 15px 35px;
    }
  }
  #select-button {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }
`;

export default function Select({optionCapture}: SelectInterface) {
  const [viewContent, setViewContent] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");
  const categories: string[] = [
    "Shōnen",
    "Seinen",
    "Shōjo",
    "Yaoi",
    "Yuri",
    "Josei"
  ];

  return (<SelectSt className="categorie">
    <div id="select-button" onClick={() => setViewContent(oldViewContent => !oldViewContent)}>
      <span>categorie {option==="" ? "" : ":"+option}</span>
      <IoIosArrowForward/>
    </div>
    {viewContent ?
      <div className="optionlist">{categories?.map((categorie: string) => 
        <div className="option" onClick={(optionCapture: unknown)=> {
          setOption(categorie); 
          setViewContent(oldViewContent => !oldViewContent);
          if(typeof optionCapture==="function")
            optionCapture(categorie)
        }}>
          {categorie}
        </div>
      )}</div> :
      null
    }
  </SelectSt>);
}