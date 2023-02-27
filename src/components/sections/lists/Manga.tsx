import { useContext, useEffect } from 'react';
import PresentationImg from "./PresentationImg";
import styled from "@emotion/styled";
import { IManga } from "@/types/components/IManga";
import CategoryButton from "@/styles/components/CategoryButton";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import { MangaViewerContext } from '@/contexts/MangaViewerContext';

const MangaSt = styled(motion.article)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  max-width: 200px;
  min-width: 192px;
  > .title {
    font-size: 18px !important;
    font-family: var(--font-one);
  }
  > .img-list {
    /* width: 193px; */
    min-height: 200px;
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    #image-0 {
      transform: translateX(0px) scale(1) !important;
      position: absolute;
      transition: transform 300ms;
      z-index: 2 !important;
    }
    #image-1 {
      transform: translate(32.5px, 6px) scale(.95) !important;
      position: absolute;
      transition: transform 1s;
      z-index: 1 !important;
    }
    #image-2 {
      transform: translate(65px, 10px) scale(.9) !important;
      position: absolute;
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
  > .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    > li > button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      font-size: 18px;
      > svg * {
        color: #ff0f4f;
        stroke: #ff144e;
      }
    }
  }
  .category {
    margin: 0 auto;
  }
`;

export default function Manga({id, title, idCategory, category, images, children} : IManga) {
  const router= useRouter();
  const { handleMangaViewer } = useContext(MangaViewerContext);

  return <li>
    <MangaSt
      initial={{ opacity: 0.1 }}
      transition={{delay: .25}}
      whileInView={{ opacity: 1 }}
    >
      <h3 className="title">{title}</h3>
      <ul className="options">{children}</ul>
      <ul className="img-list" onClick={() => handleMangaViewer({type: 'id', id})}>
        {images?.map((img, indice) => {
          if(indice<3) return <PresentationImg 
            id={`image-${indice}`} 
            key={img.name+img.id} 
            url={`https://storage.cloud.google.com/xyz2-book-page-image-data/${img.name}`}
          />
        })}
      </ul>
      <CategoryButton onClick={() => router.push(`/page/category/${idCategory}/0`)} className="category">{category}</CategoryButton>
    </MangaSt>
  </li>;
}


