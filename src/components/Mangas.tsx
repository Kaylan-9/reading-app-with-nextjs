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
  justify-content: space-between;
  min-width: 192px;
  & > label {
    color: var(--secondary-foreground);
  }
`;

const MangaSt= styled(motion.article)`
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
    cursor: pointer;
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

export const MangasSt= styled(motion.div)`
  max-width: var(--max-width);
  width: 100%;
  padding: 1.5em 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media(max-width:700px) {
    padding: 0px;
  }
  > h2 {
    margin-bottom: 100px;
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
    @media(max-width: 700px) {
      margin-bottom: 0;
    }
  }
  > ul {
    margin: 5em 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
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
            title={title}
            name={img.name}
          />
        })}
      </ul>
    </MangaSt>
  </li>;
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
                <ProfilePic imgurl={book?.user?.image ?? ''} width='30px' min_height='30px'/>
                <label>
                  <strong>por</strong> {book?.user?.name}
                </label>
              </UserProfile>
            </li>) :
            null
          }
        </Manga>
      )}
    </ul>
  </MangasSt>);
}