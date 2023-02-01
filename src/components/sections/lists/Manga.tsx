import { ReactNode } from "react";
import PresentationImg from "./PresentationImg";
import styled from "@emotion/styled";
import Link from "next/link";


type OptionType = {
  object: ReactNode,
  func: (id: number) => void,
}

interface MangaInterface {
  id: number;
  title: string;
  path: string;
  images: any[];
  options: OptionType[];
}

const MangaSt = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  max-width: 200px;
  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .title {
      font-size: 18px !important;
      font-family: var(--font-one);
      margin-bottom: 15px;
    }
    & > .imagelist {
      #image-0 {
        transform: translateX(-100px) scale(1) !important;
        position: relative;
        transition: transform 300ms;
        z-index: 2 !important;
      }
      #image-1 {
        transform: translate(-70px, 6px) scale(.95) !important;
        position: relative;
        transition: transform 1s;
        z-index: 1 !important;
      }
      #image-2 {
        transform: translate(-35px, 10px) scale(.9) !important;
        position: relative;
        transition: transform 500ms;
        z-index: 0 !important;
      }
      #image-1 > div, #image-2 > div {transition: transform 1s}
      &:hover {
        #image-0 {transform: translateX(-80px) scale(1) !important;}
        #image-1 {transform: translateX(-70px) scale(1) !important;}
        #image-2 {transform: translateX(-60px) scale(1) !important;}
      }
    }
  }
  & > .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 195px;
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

export default function Manga({id, title, images, options} : MangaInterface) {
  return <li>
    <MangaSt>
      <h3 className="title">{title}</h3>
      <ul className="options"> 
        {options.map((option, indice) => (<li key={indice}>
          <button onClick={() => {
            option.func(id);
          }}>
            {option.object}
          </button>
        </li>))}
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


