import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default styled(motion.article)`
  display: grid;
  grid-template-areas: 
    'manga-title'
    'manga-img-list'
    'manga-options'
  ;
  align-items: flex-start;
  row-gap: 1em;
  background-color: rgb(var(--secondary-bg)) !important;
  padding: 1em 1.5em;
  border-radius: 1em;
  min-width: 240px;
  @media (max-width: 700px) {
    padding: 0 !important;
    background-color: rgb(var(--bg)) !important;
    grid-template-areas: 
      'manga-img-list manga-title'
      'manga-img-list manga-options'
      'manga-img-list .'
    ;
    grid-template-columns: 192px auto;
    grid-template-rows: min-content 30px auto !important;
    gap: 1em;
    > .title {
      font-size: 1.25em !important;
      min-width: 100%;
    }
  }
  @media (max-width: 400px) {
    min-width: 192px !important;
    margin: 0 auto !important;
    grid-template-columns: 192px !important;
    grid-template-rows: initial !important;
    grid-template-areas: 
      'manga-title'
      'manga-img-list'
      'manga-options'
    ;
  }
  @media (max-width: 300px) {
    min-width: 75vw !important;
    margin: 0 auto !important;
    grid-template-columns: 15vw !important;
    grid-template-rows: initial !important;
    grid-template-areas: 
      'manga-title'
      'manga-img-list'
      'manga-options'
    ;
  }
  > .title {
    font-size: 1em;
    font-family: var(--font-one);
    margin: 0 !important;
    grid-area: manga-title;
  }
  > .img-list {
    cursor: pointer;
    min-height: 200px;
    background-color: transparent;
    border: none;
    display: grid;
    grid-area: manga-img-list;
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
    grid-area: manga-options;
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


