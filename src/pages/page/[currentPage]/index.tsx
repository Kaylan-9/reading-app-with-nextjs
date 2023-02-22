import { countPages, getAllBooks } from "@/lib/db/books";
import { GetStaticProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import Head from 'next/head';
import Pagination from "@/components/sections/header/Pagination";
import { IHomePageProps } from "@/types/pages/IHomePageProps";


export async function getStaticPaths() {
  const nOfPages = await countPages();
  let paths = [];
  for(let i=0;i<=nOfPages;i++)
    paths.push({
      params: {
        currentPage: String(i)
      }
    });
  
  return {
    paths,
    fallback: true,
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

export default ({currentPage, nOfPages, books}: IHomePageProps & {currentPage: number}) => {

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <Header>
      <Pagination baseURL={`/page`} current={currentPage} nOfPages={nOfPages}/>
    </Header>
    <main>
      <Mangas title='Mangás' books={books}/>
    </main>
  </>)
};