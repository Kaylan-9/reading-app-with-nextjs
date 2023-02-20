import { BookUser } from '@/lib/db/books';
import styled from '@emotion/styled';
import Manga from "./Manga";
import { useRouter } from 'next/router';
import ProfilePic from '../ProfilePic';
import IMangas from '@/types/components/IMangas';

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
    margin: 100px 0;
    text-align: center;
    background: white;
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

export const UserProfile = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 192px;
  & > label {
    color: var(--secondary-foreground);
  }
`;

export default function Mangas({title, books}: IMangas) {
  const router = useRouter();
  return (<MangaList>
    {title!==undefined ? (<h2 className='title'>
      <span>{title}</span>
    </h2>) : null}
    <ul>
      {books?.map((book: BookUser, indice) => 
        <Manga
          key={book.id+book.title}
          id={book.id as number}
          title={book.title} 
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
  </MangaList>);
}