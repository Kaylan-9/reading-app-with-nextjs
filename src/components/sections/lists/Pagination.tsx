import styled from "@emotion/styled";
import { useRouter } from "next/router";

const StPagination = styled.nav`
  width: 100%;
  padding: 25px 150px;
  background-color: rgb(var(--secondary-background));
  & > ul {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: flex-end;
    & > li {
      & > button {
        cursor: pointer;
        border: none;
        box-shadow: 0px 0px 10px 1px #0000007e;
        background-color: var(--tertiary-background);
        color: white;
        font-size: 20px;
        padding: 5px;
        border-radius: 10px;
        width: 40px;
        height: 40px;
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
  for(let i=0;i<=nOfPages;i++) linkList.push(`/?n=${i}`);
  return (<StPagination>
    <ul>
      {linkList.map((link: string, indice: number) => <li key={link}>
        <button className={current===indice ? 'marked' : ''} onClick={() => {
          router.push(link);
        }}>{indice}</button>
      </li>)}
    </ul>  
  </StPagination>);
}