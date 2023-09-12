import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ProfilePic from '../ProfilePic';
import IComics from '@/types/components/IComics';
import { IComicUserCategories } from '@/types/data/Comics';
import Comic from '@/components/comic/index';
import Comics, { ComicsGrid } from './styled';

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

export default ({title, books: comics}: IComics) => {
  const router = useRouter();
  return (<Comics>
    {!title ? (<h2 className='title'>{title}</h2>) : null}
    <ComicsGrid>
      {comics?.map((comic: IComicUserCategories) => 
        <Comic
          key={comic.id+comic.title}
          id={comic.id as number}
          title={comic.title}
          idCategory={comic.categorie.id} 
          category={comic.categorie.name}
          images={comic.imagepaths} 
        >
          {comic.user !== undefined ?
            (<li>
              <UserProfile onClick={() => router.push(`/user/@${comic.user.id}`)}>
                <ProfilePic imgurl={comic?.user?.image ?? ''} className={css`
                  width: 35px;
                  min-height: 35px;
                  @media (max-width: 700px) {
                    width: 8vw;
                    min-height: 8vw;
                    border-radius: 25%;
                  }
                `}/>
                <label> {comic?.user?.name} </label>
              </UserProfile>
            </li>) :
            null
          }
        </Comic>
      )}
    </ComicsGrid>
  </Comics>);
}