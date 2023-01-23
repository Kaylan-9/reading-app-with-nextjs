import { ReactNode, useEffect } from "react";
import { GrFavorite } from "react-icons/gr";
import { BiSpreadsheet } from "react-icons/bi";
import Img from "../Img";
import { Images } from "@/lib/db";
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
  min-width: 183px;
  min-height: 163px;
  @media(max-width:700px) {
    min-width: 233px;
    min-height: 244px;
    & > .options {
      gap: 50px;
      margin-top: 180px !important;
      & > li > button {
        font-size: 24px;
      }
    }
    & > a { 
      & > .title {
        margin-bottom: 0px;
      }
      & > .imagelist {
        #image-0 {transform: translateX(-180px) scale(.9) !important}
        #image-1 {transform: translate(-90px, -5px) scale(1) !important}
        #image-2 {transform: translateX(0px) scale(.95) !important}
        &:hover > #image-0, &:hover > #image-2 {transform: translateX(-90px) !important}
      }
    }
  }
  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > .title {
      font-size: 18px;
      font-family: var(--font-one);
      margin-bottom: 15px;
    }
    & > .imagelist {
      #image-0 {
        transform: translateX(0px) scale(.9);
        transition: transform 300ms;
      }
      #image-1 {
        transform: translate(-55px, -2.5px);
        z-index: 5;
        position: relative;
        transition: transform 1s;
        div {
          transition: border-radius 3s;
        }
      }
      #image-2 {
        transform: translateX(-100px) scale(.95);
        transition: transform 500ms;
      }
      #image-0 > div, #image-2 > div {
        transition: transform 1s;
      }
      &:hover {
        #image-0, #image-2 {
          transform: translateX(-55px);
          div {
            transform: scale(.5);
          }
        }
        #image-1 {
          transform: translate(calc(-1.1 * 55px), -12.5px) scale(1.1);
          div {
            border-radius: 100%;
          }
        }
      }
    }
  }
  & > .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 100px;
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
              return <Img 
                id={`image-${indice}`}
                key={img.name+img.id} 
                url={`/images/${path}/${img.name}.${img.type}`}
              />
            }
          })}
        </ul>
      </Link>
      <ul className="options"> 
        {options.map((option, indice) => (<li>
          <button key={indice} onClick={() => {
            option.func(id);
          }}>
            {option.Icon}
          </button>
        </li>))}
      </ul>
    </MangaSt>
  </li>
}


