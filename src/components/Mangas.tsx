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

export const UserProfile = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
  min-width: 192px;
  & > label {
    color: var(--secondary-foreground);
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
  background-color: rgb(var(--secondary-background)) !important;
  padding: 1em 1.5em;
  border-radius: 1em;
  min-width: 240px;
  @media (max-width: 700px) {
    min-width: 100%;
    padding: 0 !important;
    background-color: transparent !important;
    grid-template-areas: 
      'manga-img-list manga-title'
      'manga-img-list manga-options'
      'manga-img-list .'
    ;
    grid-template-columns: auto min-content;
    grid-template-rows: repeat(2, 20px) auto !important;
    gap: 1em;
    > .title {
      font-size: 1.25em !important;
      min-width: 100%;
    }
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
  background-color: rgb(var(--background));
  border-radius: 1em;
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 1.5em;
    > ul {
      grid-template-columns: auto !important;
      min-width: 100%;
      row-gap: 2rem !important;
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
      color: var(--secondary-foreground) !important;
      font-weight: lighter;
      font-size: .8em;
      text-decoration: var(--secondary-foreground) underline  !important;
    }
  }
  > ul {
    margin: 5em 0;
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
                <ProfilePic imgurl={book?.user?.image ?? ''} width='35px' min_height='35px'/>
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