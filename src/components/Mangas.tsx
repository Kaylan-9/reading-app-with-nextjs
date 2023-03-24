import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ProfilePic from './ProfilePic';
import IMangas from '@/types/components/IMangas';
import { IBookUserCategories } from '@/types/data/Books';
import PresentationImg from "./PresentationImg";
import { useContext } from 'react';
import { MangaViewerContext } from '@/contexts/MangaViewerContext';
import { motion } from 'framer-motion';
import { IManga } from '@/types/components/IManga';
import { css } from '@emotion/css';

export const UserProfile = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  gap: 1em;
  & > label {
    color: var(--secondary-fg);
  }
`;

const MangaSt= styled(motion.article)`
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

export const MangasSt= styled(motion.div)`
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(var(--bg));
  border-radius: 1em;
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 1.5em;
    > h2 { 
      margin-bottom: 1.5em;
    }
    > ul {
      grid-template-columns: auto !important;
      min-width: 100%;
      row-gap: 2rem !important;
      justify-content: center !important;
      > li {
        margin: 0 !important; 
      }
    }
  }
  > h2 {
    text-align: center;
    background: white;
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex !important;
    align-items: center;
    gap: 1.5rem;
    a {
      color: var(--secondary-fg) !important;
      font-weight: lighter;
      font-size: .8em;
      text-decoration: var(--secondary-fg) underline  !important;
    }
  }
  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    row-gap: 3rem;
    column-gap: 1vw;
    width: 100%;
    padding: 0 50px;
    > li {
      margin: 0 auto;    
      cursor: pointer;
    }
  }
`;

export function Manga({id, title, images, children} : IManga) {
  const { handleMangaViewer } = useContext(MangaViewerContext);
  return <motion.li>
    <MangaSt>
      <h3 className="title">{title}</h3>
      <ul className="img-list" onClick={() => handleMangaViewer({type: 'id', id})}>
        {images?.map((img, indice) => {
          if(indice<3) return <PresentationImg 
            id={`image-${indice}`} 
            key={img.name+img.id} 
            title={title}
            name={img.name}
          />
        })}
      </ul>
      <ul className="options">{children}</ul>
    </MangaSt>
  </motion.li>;
}

export default function Mangas({title, books}: IMangas) {
  const router = useRouter();
  return (<MangasSt>
    {title!==undefined ? (<h2 className='title'>{title}</h2>) : null}
    <ul>
      {books?.map((book: IBookUserCategories) => 
        <Manga
          key={book.id+book.title}
          id={book.id as number}
          title={book.title}
          idCategory={book.categorie.id} 
          category={book.categorie.name}
          images={book.imagepaths} 
        >
          {book.user !== undefined ?
            (<li>
              <UserProfile onClick={() => router.push(`/user/@${book.user.id}`)}>
                <ProfilePic imgurl={book?.user?.image ?? ''} className={css`
                  width: 35px;
                  min-height: 35px;
                  @media (max-width: 700px) {
                    width: 8vw;
                    min-height: 8vw;
                    border-radius: 25%;
                  }
                `}/>
                <label> {book?.user?.name} </label>
              </UserProfile>
            </li>) :
            null
          }
        </Manga>
      )}
    </ul>
  </MangasSt>);
}