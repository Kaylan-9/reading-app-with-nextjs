import Header from '@/components/Header';
import { useRef, useState, useContext } from 'react';
import Head from 'next/head';
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";
import { ModalContext } from "@/contexts/ModalContext";
import ReadingAside from "@/components/ReadingAside";
import Column from "@/styles/Column";
import styled from "@emotion/styled";
import UserMangaLists from '@/components/Users';
import useUsersPosts from '@/ultis/useUsersPosts';
import { ICategory } from '@/types/data/Category';

export const getStaticProps: any = async () => {
  const categories = await getAllCategory();
  return {
    props: {
      categories,
    }
  }
};

export const NavMain= styled(Column.withComponent('nav'))`
  grid-area: page-nav;
  margin: 1.5em 1.5em 0 0 !important;
  padding: 0 !important;
`;

export default function Index({categories}: {categories: ICategory[]}) {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { handleModal } = useContext(ModalContext);
  const { usersPosts } = useUsersPosts();

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <NavMain>
      <Header>
        {/* <div className='search'>
          <div className="input-icon">
            <BiSearch onClick={async () => {
              const dataToDoSearch = JSON.stringify({
                title: searchInput.current?.value==="" ? false : searchInput.current?.value,
                category: categorySearchPicker.current?.value==="" ? false : categorySearchPicker.current?.value
              });
              const resultResearch = await fetch('/api/book/search', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: dataToDoSearch
              });
              const dataResearch = await resultResearch.json();
              setSearchContent(dataResearch.research);
            }}/>
            <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
          </div>
          <Select ref={categorySearchPicker}/>
        </div> */}
      </Header>
      <ReadingAside categories={categories}/>
    </NavMain>
    <main id={`page-main`}>
      <UserMangaLists data={usersPosts}/>
    </main>
  </>)
};
