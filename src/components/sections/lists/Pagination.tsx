import styled from "@emotion/styled";
import { useRouter } from "next/router";

const StPagination = styled.nav`
  width: 100%;
  margin: 75px 0;
  & > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    & > li {
      & > button {
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 20px;
      }
    }
  }
`;

export default function Pagination({nOfPages} : {nOfPages: number}){
  const router = useRouter();
  let linkList: string[]= [];
  for(let i=0;i<=nOfPages;i++) linkList.push(`/?n=${i}`);
  return (<StPagination>
    <ul>
      {linkList.map((link: string, indice: number) => <li key={link}>
        <button onClick={() => {
          router.push(link);
        }}>{indice}</button>
      </li>)}
    </ul>  
  </StPagination>);
}