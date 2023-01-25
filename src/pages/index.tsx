import styles from '../components/components.module.css';
import { GetServerSideProps } from "next";
import Header from '@/components/Header';
import { Books, getAllBooks } from '@/lib/db';
import Mangas from '@/components/lists/Mangas';
import { useCallback, useRef, useState } from 'react';
import Select from '../components/Select';
import { MdOutlineManageSearch } from 'react-icons/md';
import Head from 'next/head';
import * as gcs from '../lib/gcs'

export const getServerSideProps: GetServerSideProps = async ({ res })  => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=150'
  )

  const books = await getAllBooks();
  return {props: {books}}
}

export default function Home({books}: {books: Books[]}) {
  const [ searchContent,  setSearchContent ] = useState<Books[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <Header 
      search={<div className="inputicon">
        <MdOutlineManageSearch onClick={async () => {
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
          setSearchContent(dataResearch.research as Books[]);
        }}/>
        <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
      </div>}
    >
      <Select ref={categorySearchPicker}/>
    </Header>
    <main className={styles.main}>
      <Mangas books={(!searchContent ? books : searchContent)}/>
    </main>
  </>)
}
