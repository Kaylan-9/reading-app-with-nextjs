import { Books } from '@/lib/db/books';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import styled from '@emotion/styled';
import Manga from "./Manga";
import { useState } from 'react';
import { MdOutlineFavorite } from 'react-icons/md';

const MangaList = styled.div`
  max-width: var(--max-width);
  width: 100%;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media(max-width:700px) {
    padding: 0px;
  }
  & > h2 {
    margin-bottom: 60px;
    text-align: center;
    background: linear-gradient(90deg, #ffffff76 0%, #ffffff 50%, #ffffff13 100%);
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex !important;
    align-items: center;
    gap: 15px;
    margin-top: 50px;
    @media(max-width: 700px) {
      margin-bottom: 0;
    }
  }
  & > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    padding: 0 50px;
    & > li {
      margin: 0 auto;
    }
  }
`;

export default function Mangas({title, books}: {title?: string, books: Books[]}) {
  const [viewContent, setViewContent] = useState<boolean>(true);
  const Icon = viewContent ? AiOutlineArrowUp : AiOutlineArrowDown;
  return (<MangaList>
    {title!==undefined ? (<h2 className='title' onClick={() => setViewContent(oldViewContent => !oldViewContent)}>
      <span>{title}</span>
      <Icon/>
    </h2>) : null}
    {viewContent ? 
      <ul>
        {books.map((book: Books, indice) => 
          <Manga
            key={book.id+book.title}
            id={book.id as number}
            title={book.title} 
            path={book.path} 
            images={book.imagepaths}
            options={[
              {Icon:<MdOutlineFavorite/>, func(){}}
            ]}
          />
        )}
      </ul> :
      null
    }
  </MangaList>);
}