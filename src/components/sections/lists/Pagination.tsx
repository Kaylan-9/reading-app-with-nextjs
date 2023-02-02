import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const StPagination = styled.nav`
  width: 100%;
  padding: 15px 150px;
  background-color: rgb(var(--secondary-background));
  & > ul {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
    & > li {
      & > button {
        cursor: pointer;
        border: none;
        box-shadow: 0px 0px 20px 0px #00000032;
        background-color: #1d1c1c;
        color: var(--secondary-foreground);
        font-size: 17px;
        padding: 2.5px;
        border-radius: 10px;
        width: 40px;
        height: 40px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .marked {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
`;

interface IPagination {
  nOfPages: number; 
  current: number;
}

export default function Pagination({nOfPages, current} : IPagination){
  const router = useRouter();
  let linkList: string[]= [];
  console.log(nOfPages)
  for(let i=0;i<=nOfPages;i++) linkList.push(`/?n=${i}`);
  return (<StPagination>
    <ul>
      {current!==0 ?
        <li>
          <button onClick={() => {
            router.push(`/`);
          }}>
            <IoIosArrowBack/>
            <IoIosArrowBack/>
          </button>
        </li> :
      null}
      {linkList       
      .map((link: string, indice: number) =>  {
        return (current>=0 && current<2 && (indice<=2)) || 
        (indice>=(current-1) && indice<=(current+1) && current!==(linkList.length-1)) ||
        (indice>=(current-2) && indice<=current && current===(linkList.length-1)) ? 
        <li key={link}>
          <button className={current===indice ? 'marked' : ''} onClick={() => {
            router.push(link);
          }}>{indice}</button>
        </li> : null;
      })}
      {current!==nOfPages ? <li>
        <button onClick={() => {
          router.push(`/?n=${nOfPages}`);
        }}>
          <IoIosArrowForward/>
          <IoIosArrowForward/>
        </button>
      </li> : 
      null
      } 
    </ul>  
  </StPagination>);
}