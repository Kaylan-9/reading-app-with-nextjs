import Input from "@/styles/Input";
import requestParameters from "@/ultis/requestParameters";
import styled from "@emotion/styled";
import { forwardRef, useState, useEffect } from "react";
import { IoIosArrowForward } from 'react-icons/io';

const SelectSt = styled.div`
  border-radius: 5px;
  border: none;
  grid-area: bookcategoryselect;
  text-align: center;
  background-color: rgb(var(--secondary-bg));
  color: var(--secondary-fg);
  font-weight: bold;
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
    background-color: rgb(var(--secondary-bg));
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
  const [option, setOption] = useState<null | string>(null);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/category', {
        ...requestParameters.json,
        method: 'GET'
      });
      setCategories(await data.json());
    })();
  }, [])

  return (<SelectSt className="category">
    <div id="select-button" onClick={() => setViewContent(oldViewContent => !oldViewContent)}>
      <span>{option===null ? `categoria` : `${option}`}</span>
      <IoIosArrowForward/>
    </div>
    <input type="text" ref={ref} defaultValue={option as string}/>
    {viewContent ?
      <div className="optionlist">
        {categories?.map((category: {id: number, name: string}) => 
          <div key={category.id} className="option" onClick={()=> [
            setOption(category.name),
            setViewContent(false)
          ]}>
            {category.name}
          </div>
        )}
        <Input type="text" placeholder={`escrever nova categoria`} onChange={(e: any) => setOption(e.target.value)}/>
      </div> :
      null
    }
  </SelectSt>);
});

Select.displayName = "Select";

export default Select;