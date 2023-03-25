import { countPages, getAllBooks } from "@/lib/db/books";
import Header from '@/components/Header';
import Mangas from '@/components/Mangas';
import Head from 'next/head';
import Pagination from "@/components/Pagination";
import { IPaginationPageProps } from "@/types/pages/IPaginationPageProps";
import ReadingAside from "@/components/ReadingAside";
import { getAllCategory } from "@/lib/db/categories";
import Main from "@/components/Main";

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
    fallback: 'blocking',
  }
};

export async function getStaticProps(context: any) {
  const { params } = context;
  let currentPage = Number(params?.currentPage ?? 0);
  const books = await getAllBooks(currentPage);
  const nOfPages = await countPages();
  const categories= await getAllCategory();
  return {
    props: {
      currentPage,
      books,
      nOfPages,
      categories
    }, 
    revalidate: 20
  }
}

export default function Index({currentPage, nOfPages, books, categories}: IPaginationPageProps) {
  return (<>
    <Head>
      <title>Todos Mangás</title>
      <meta name={`description`} content={`A lista de todos os mangás do website independente de gênero ou outras características, Lista`}/>
      <meta name="rating" content="general" />
    </Head>
    <Header/>  
    <Main>
      <ReadingAside categories={categories}/>
      <Pagination baseURL={(position)=> `/page/${position}`} current={currentPage} nOfPages={nOfPages}/>
      <Mangas title='Mangás' books={books}/>
    </Main>
  </>)
};