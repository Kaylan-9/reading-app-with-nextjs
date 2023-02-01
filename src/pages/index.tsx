import { GetServerSideProps } from "next";
import Header from '@/components/sections/Header';
import { BookUser, countPages, getAllBooks } from '@/lib/db/books';
import Mangas from '@/components/sections/lists/Mangas';
import { useContext, useEffect, useRef, useState } from 'react';
import Select from '../components/ultis/Select';
import { MdOutlineManageSearch } from 'react-icons/md';
import Head from 'next/head';
import { ModalContext } from "@/contexts/ModalContext";
import { AboutText } from "@/components/sections/AboutText";
import { useSession } from "next-auth/react";
import Pagination from "@/components/sections/lists/Pagination";

export const getServerSideProps: GetServerSideProps = async (context)  => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=150'
  );

  const { n } = context.query;
  let currentPage = 0;
  if(n!==undefined) currentPage = Number(n);
  const books = await getAllBooks(currentPage);
  const nOfPages = await countPages();
  return {props: {
    books,
    nOfPages,
    currentPage
  }}
}

interface IHome {
  books: BookUser[], 
  nOfPages: number,
  currentPage: number
}

export default function Home({books, nOfPages, currentPage}: IHome) {
  const { handleModal } = useContext(ModalContext);
  const [ searchContent,  setSearchContent ] = useState<BookUser[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status==='unauthenticated') 
      handleModal({type: 'add', newModal: {id: 0, message: (<AboutText/>)}});
  }, [session]);

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
          setSearchContent(dataResearch.research as BookUser[]);
        }}/>
        <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
      </div>}
    >
      <Select ref={categorySearchPicker}/>
    </Header>
    <main>
      <Pagination current={currentPage} nOfPages={nOfPages}/>
      <Mangas title='Mangás' books={(!searchContent ? books : searchContent)}/>
    </main>
  </>)
}

