import { IPaginationProps } from "@/types/components/IPaginationProps";
import { useRouter } from "next/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Pagination, { PageButton } from "./styled";

export default ({baseURL, nOfPages, current} : IPaginationProps) => {
  const router = useRouter();
  if(nOfPages===1) {
    let linkList: string[]= [];
    for(let i=0;i<=nOfPages;i++) linkList.push(baseURL(i));
    return (<Pagination>
      <ul>
        {current!==0 ?
          <li>
            <PageButton type="button" onClick={() => {
              router.push(baseURL(0));
            }}>
              <IoIosArrowBack/>
              <IoIosArrowBack/>
            </PageButton>
          </li> :
        null}
        {linkList       
        .map((link: string, indice: number) =>  {
          return (current>=0 && current<2 && (indice<=2)) || 
          (indice>=(current-1) && indice<=(current+1) && current!==(linkList.length-1)) ||
          (indice>=(current-2) && indice<=current && current===(linkList.length-1)) ? 
          <li key={link}>
            <PageButton type="button" className={current===indice ? 'marked' : ''} onClick={() => {
              router.push(link);
            }}>{indice}</PageButton>
          </li> : null;
        })}
        {current!==nOfPages ? <li>
          <PageButton  type="button" onClick={() => {
            router.push(baseURL(nOfPages));
          }}>
            <IoIosArrowForward/>
            <IoIosArrowForward/>
          </PageButton>
        </li> : 
        null
        } 
      </ul>  
    </Pagination>);
  }
  return null;
}