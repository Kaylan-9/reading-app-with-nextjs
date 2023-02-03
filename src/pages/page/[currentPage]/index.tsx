import { BookUser, countPages, getAllBooks } from "@/lib/db/books";
import IProfile from "@/types/IProfile";
import { GetStaticProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import { useContext, useEffect, useRef, useState } from 'react';
import Select from '../../../components/ultis/Select';
import Head from 'next/head';
import { ModalContext } from "@/contexts/ModalContext";
import { AboutText } from "@/components/sections/AboutText";
import { useSession } from "next-auth/react";
import Pagination from "@/components/sections/header/Pagination";
import { BiSearch } from "react-icons/bi";
import { IHomePageProps } from "@/types/pages/IHomePageProps";


export async function getStaticPaths() {
  const nOfPages = await countPages();
  let paths = [];
  for(let i=0;i<=nOfPages;i++) {
    paths.push({
      params: {
        currentPage: String(i)
      }
    });
  }
  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  let currentPage = Number(params?.currentPage ?? 0);
  const books = await getAllBooks(currentPage);
  const nOfPages = await countPages();
  return {
    props: {
      currentPage,
      books,
      nOfPages
    }, 
    revalidate: 20
  }
}

export default ({profiles, books, nOfPages, currentPage}: IHomePageProps & {currentPage: number}) => {
  const { handleModal } = useContext(ModalContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status==='unauthenticated') 
      handleModal({type: 'add', newModal: {id: 0, message: (<AboutText/>)}});
  }, [session]);

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <Header>
      <Pagination current={currentPage} nOfPages={nOfPages}/>
    </Header>
    <main>
      <Mangas title='Mangás' books={books}/>
    </main>
  </>)
};