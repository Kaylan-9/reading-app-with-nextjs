import { ReactNode } from "react";
import PresentationImg from "./PresentationImg";
import { Images } from "@/lib/db/db";
import styled from "@emotion/styled";
import Link from "next/link";


type OptionType = {
  Icon: ReactNode,
  func: (id: number) => void,
}

interface MangaInterface {
  id: number;
  title: string;
  path: string;
  images: Images[];
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
      #image-1 {
        transform: translateX(-100px) scale(.9) !important;
        transition: transform 300ms;
      }
      #image-0 {
        transform: translate(-70px, -7.5px) scale(1) !important;
        z-index: 5;
        position: relative;
        transition: transform 1s;
      }
      #image-2 {
        transform: translate(-35px, -3.75px) scale(.95) !important;
        transition: transform 500ms;
      }
      #image-1 > div, #image-2 > div {transition: transform 1s}
      &:hover {
        #image-1, #image-2 {
          transform: translate(-60px, -3.75px) scale(.95) !important;
        }
        #image-0 {
          transform: translate(calc(-1.1 * 55px), -12.5px);
        }
      }
    }
  }
  & > .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 190px;
    gap: 5px;
    & > li > button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 18px;
      & > svg * {
        color: white;
        stroke: white;
      }
    }
  }
`;

export default function Manga({id, title, path, images, options} : MangaInterface) {
  return <li>
    <MangaSt>
      <Link href={`/manga/@${id}`}>
        <h3 className="title">{title}</h3>
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
      <ul className="options"> 
        {options.map((option, indice) => (<li key={indice}>
          <button onClick={() => {
            option.func(id);
          }}>
            {option.Icon}
          </button>
        </li>))}
      </ul>
    </MangaSt>
  </li>
}


