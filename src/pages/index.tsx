import { getRandomBooks } from "@/lib/db/books";
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/Mangas';
import { useRef, useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";
import { ModalContext } from "@/contexts/ModalContext";
import ReadingAside from "@/components/sections/ReadingAside";

export const getStaticProps: any = async (ctx: any) => {
  const books = await getRandomBooks();
  const categories = await getAllCategory();
  return {
    props: {
      books,
      categories,
    }
  }
};

export default ({categories, books}: IHomePageProps) => {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { handleModal } = useContext(ModalContext);

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
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
    <main>
      <ReadingAside categories={categories}/>
      <Mangas title='Mangás' link={`/page/0`} linkname={`ver todos`} books={books}/>
    </main>
  </>)
};
