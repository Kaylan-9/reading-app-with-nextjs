import { getRandomBooks } from "@/lib/db/books";
import { GetServerSideProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import { useRef, useState } from 'react';
import Head from 'next/head';
import { BiSearch } from "react-icons/bi";
import { Categories } from "@/components/sections/header/Categories";
import Select from "@/components/ultis/Select";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";

export const getStaticProps: GetServerSideProps = async () => {
  const books = await getRandomBooks();
  const categories = await getAllCategory();
  return {
    props: {
      books,
      categories
    }
  }
};

export default ({categories, books}: IHomePageProps) => {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);

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
      <Categories data={categories}/>
    </Header>
    <main>
      <Mangas title='Mangás' link={`/page/0`} linkname={`ver todos`} books={(!searchContent ? books : searchContent)}/>
    </main>
  </>)
};
