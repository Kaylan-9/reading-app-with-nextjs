import { IPaginationProps } from "@/types/components/IPaginationProps";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import StPageButton from "./StPageButton";

const StPagination = styled.nav`
  width: 100%;
  grid-area: pagination;
  padding: 4.5em 0;
  & > ul {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
    & > li {
      .marked {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
`;

export default function Pagination({baseURL, nOfPages, current} : IPaginationProps){
  const router = useRouter();
  if(nOfPages===1) {
    let linkList: string[]= [];
    for(let i=0;i<=nOfPages;i++) linkList.push(baseURL(i));
    return (<StPagination>
      <ul>
        {current!==0 ?
          <li>
            <StPageButton onClick={() => {
              router.push(baseURL(0));
            }}>
              <IoIosArrowBack/>
              <IoIosArrowBack/>
            </StPageButton>
          </li> :
        null}
        {linkList       
        .map((link: string, indice: number) =>  {
          return (current>=0 && current<2 && (indice<=2)) || 
          (indice>=(current-1) && indice<=(current+1) && current!==(linkList.length-1)) ||
          (indice>=(current-2) && indice<=current && current===(linkList.length-1)) ? 
          <li key={link}>
            <StPageButton className={current===indice ? 'marked' : ''} onClick={() => {
              router.push(link);
            }}>{indice}</StPageButton>
          </li> : null;
        })}
        {current!==nOfPages ? <li>
          <StPageButton onClick={() => {
            router.push(baseURL(nOfPages));
          }}>
            <IoIosArrowForward/>
            <IoIosArrowForward/>
          </StPageButton>
        </li> : 
        null
        } 
      </ul>  
    </StPagination>);
  }
  return null;
}