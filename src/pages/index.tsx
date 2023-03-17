import Header from '../components/Header';
import { useRef, useState, useContext } from 'react';
import Head from 'next/head';
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";
import { ModalContext } from "@/contexts/ModalContext";
import ReadingAside from "@/components/ReadingAside";
import useMangas from '@/ultis/useMangas';
import { ICategory } from '@/types/data/Category';
import { NavMain } from '@/styles/NavMain';
import Mangas from '@/components/Mangas';
import { morePopular as _morePopular } from '@/lib/db/books';

export const getStaticProps: any = async () => {
  const categories= await getAllCategory();
  const morePopular= await _morePopular();
  console.log(morePopular)
  return {
    props: {
      categories,
      morePopular
    }
  }
};

export default function Index({categories, morePopular}: {morePopular: IBookUserCategories[], categories: ICategory[]}) {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { handleModal } = useContext(ModalContext);
  const { mangas } = useMangas();

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
      <Mangas title='Mais populares' books={morePopular}/>
      <Mangas title='Mangás' books={mangas}/>
    </main>
  </>)
};
