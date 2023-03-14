import Column from '@/styles/Column';
import { IBookCategories } from '@/types/data/Books';
import { IUserBookCategoriesPublic } from '@/types/data/Users'
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react'
import { Manga } from './Mangas';
import ProfilePic from './ProfilePic'

interface IUserMangaListProps {
  userData: IUserBookCategoriesPublic
};

interface IUserMangaListsProps {
  data: IUserBookCategoriesPublic[]
};

export const UserMangaListSt= styled(motion.li)`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  column-gap: 4em;
  width: 100%;
  max-width: var(--max-width);
  min-height: 260px;
  > ul {
    margin: 5em 0;
    display: grid;
    padding: 0 50px;
    display: flex;
    justify-content: center;
    > li {
      margin: 0 auto;    
      min-width: 200px;
      cursor: pointer;
    }
  }
`;

export const UserMangaListsSt= styled(Column.withComponent('div'))`
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > ul {
    margin: 0 auto;
    max-width: var(--max-width);
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    row-gap: 1.5em;
  }
  > h2 {
    text-align: center;
  }
`;

export function UserMangaList({userData}: IUserMangaListProps) {
  const router = useRouter();
  return (<UserMangaListSt>
    <ProfilePic imgurl={userData.image ?? ''} width='6em' min_height='6em'/>
    <ul>
      {userData.book.map((book: IBookCategories) => 
        <Manga
          key={book.id+book.title}
          id={book.id as number}
          title={book.title}
          idCategory={book.categorie.id} 
          category={book.categorie.name}
          images={book.imagepaths}
        />
      )}
    </ul>
  </UserMangaListSt>)
};


export default function UserMangaLists({data}: IUserMangaListsProps) {
  const router = useRouter();
  return (<UserMangaListsSt>
    <h2 className='title'>Autores de Mangás</h2>
    <ul>
      {data.map((userData: IUserBookCategoriesPublic) => 
        <UserMangaList key={userData.id+'users'} userData={userData}/>
      )}
    </ul>
  </UserMangaListsSt>)
};
