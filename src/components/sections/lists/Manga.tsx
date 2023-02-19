import { ReactNode } from "react";
import PresentationImg from "./PresentationImg";
import styled from "@emotion/styled";
import Link from "next/link";

interface MangaInterface {
  id: number;
  title: string;
  images: any[];
  children: ReactNode;
}

const MangaSt = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  max-width: 200px;
  min-height: 345.56px;
  & > .title {
    font-size: 18px !important;
    font-family: var(--font-one);
  }
  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .imagelist {
      #image-0 {
        transform: translateX(0px) scale(1) !important;
        position: relative;
        transition: transform 300ms;
        z-index: 2 !important;
      }
      #image-1 {
        transform: translate(32.5px, 6px) scale(.95) !important;
        position: relative;
        transition: transform 1s;
        z-index: 1 !important;
      }
      #image-2 {
        transform: translate(65px, 10px) scale(.9) !important;
        position: relative;
        transition: transform 500ms;
        z-index: 0 !important;
      }
      #image-1 > div, #image-2 > div {transition: transform 1s}
      &:hover {
        #image-0 {transform: translateX(10px) scale(1) !important;}
        #image-1 {transform: translateX(32.5px) scale(1) !important;}
        #image-2 {transform: translateX(40px) scale(1) !important;}
      }
    }
  }
  & > .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    & > li > button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 18px;
      & > svg * {
        color: #ff0f4f;
        stroke: #ff144e;
      }
    }
  }
`;

export default function Manga({id, title, images, children} : MangaInterface) {
  return <li>
    <MangaSt>
      <h3 className="title">{title}</h3>
      <ul className="options">
        {children}
      </ul>
      <Link href={`/manga/@${id}`}>
        <ul className="imagelist">
          {images?.map((img, indice) => {
            if(indice<3) {
              return <PresentationImg 
                id={`image-${indice}`}
                key={img.name+img.id} 
                url={`https://storage.cloud.google.com/xyz2-book-page-image-data/${img.name}`}
              />
            }
          })}
        </ul>
      </Link>
    </MangaSt>
  </li>
}


