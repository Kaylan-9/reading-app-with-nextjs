import { Books } from '@/lib/db';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import styled from '@emotion/styled';
import Manga from "./Manga";
import { useState } from 'react';
import { GrFavorite } from 'react-icons/gr';

const MangaList = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 40px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  background-color: #000000;
  & > h2 {
    margin-bottom: 85px;
    text-align: center;
    background: linear-gradient(90deg, #ffffff76 0%, #ffffff 50%, #ffffff13 100%);
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    @media(max-width: 700px) {
      margin-bottom: 0;
    }
  }
  & > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(183px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    @media(max-width:700px) {
      display: flex;
      justify-content: space-between !important;
      padding: 75px 10px;
      gap: 50px;
      flex-direction: column !important;
    }
  }
`;

export default function Mangas({books}: {books: Books[]}) {
  const [viewContent, setViewContent] = useState<boolean>(true);
  const Icon = viewContent ? AiOutlineArrowUp : AiOutlineArrowDown;
  return (<MangaList>
    <h2 className='title' onClick={() => setViewContent(oldViewContent => !oldViewContent)}>
      <span>Mangás</span>
      <Icon/>
    </h2>
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
              {Icon:<GrFavorite/>, func(){}}
            ]}
          />
        )}
      </ul> :
      null
    }
  </MangaList>);
}