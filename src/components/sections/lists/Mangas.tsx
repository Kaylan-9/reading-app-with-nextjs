import { BookUser } from '@/lib/db/books';
import styled from '@emotion/styled';
import Manga from "./Manga";
import { MdOutlineFavorite } from 'react-icons/md';
import { useRouter } from 'next/router';
import { ProfilePic } from '../ProfileAccess';


const MangaList = styled.div`
  max-width: var(--max-width);
  width: 100%;
  padding: 25px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  @media(max-width:700px) {
    padding: 0px;
  }
  & > h2 {
    margin-bottom: 120px;
    text-align: center;
    background: #ffffff;
    font-weight: bold;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex !important;
    align-items: center;
    gap: 15px;
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

export default function Mangas({title, books}: {title?: string, books: BookUser[]}) {
  const router = useRouter();
  return (<MangaList>
    {title!==undefined ? (<h2 className='title'>
      <span>{title}</span>
    </h2>) : null}
    <ul>
      {books.map((book: BookUser, indice) => 
        <Manga
          key={book.id+book.title}
          id={book.id as number}
          title={book.title} 
          path={book.path} 
          images={book.imagepaths}
          options={[
            {object:<MdOutlineFavorite/>, func(){}},
            {object:<ProfilePic imgurl={book?.user?.image ?? ''} width='30px' min_height='30px'/>, func(){
              router.push(`/user/@${book.user.id}`);
            }},
          ]}
        />
      )}
    </ul>
  </MangaList>);
}