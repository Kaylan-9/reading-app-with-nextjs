import styled from '@emotion/styled';
import Manga from "./Manga";
import { useRouter } from 'next/router';
import ProfilePic from '../ProfilePic';
import IMangas from '@/types/components/IMangas';
import { IBookUserCategories } from '@/types/data/Books';
import Link from 'next/link';
import MangaList from '@/styles/components/MangaList';

export const UserProfile = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 192px;
  & > label {
    color: var(--secondary-foreground);
  }
`;

export default function Mangas({title, link, linkname, books}: IMangas) {
  const router = useRouter();
  return (<MangaList>
    {title!==undefined ? (<h2 className='title'>
      <span>
        {title}
      </span>
      {link!==undefined && typeof link==='string' ? <Link href={link as string}>
        {linkname}
      </Link> : null}
    </h2>) : null}
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
  </MangaList>);
}