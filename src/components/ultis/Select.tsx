import styled from "@emotion/styled";
import { forwardRef, useState } from "react";
import { IoIosArrowForward } from 'react-icons/io';

const SelectSt = styled.div`
  border-radius: 5px;
  border: none;
  grid-area: bookcategoryselect;
  text-align: center;
  background-color: #292929;
  border-radius: 30px;
  > input[type=text] {
    display: none;
  }
  > #select-button, > .optionlist > .option {
    font-family: 'Roboto', sans-serif !important;
    cursor: pointer;
  }
  .optionlist {
    margin-top: 10px;
    position: absolute;
    z-index: 6;
    background-color: #292929;
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

const Select = forwardRef<HTMLInputElement>(({}, ref) => {
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

  return (<SelectSt className="category">
    <div id="select-button" onClick={() => setViewContent(oldViewContent => !oldViewContent)}>
      <span>category {option==="" ? "" : ":"+option}</span>
      <IoIosArrowForward/>
    </div>
    <input type="text" ref={ref} defaultValue={option}/>
    {viewContent ?
      <div className="optionlist">{categories?.map((category: string) => 
        <div key={category} className="option" onClick={()=> [
          setOption(category),
          setViewContent(false)
        ]}>
          {category}
        </div>
      )}</div> :
      null
    }
  </SelectSt>);
});

Select.displayName = "Select";

export default Select;