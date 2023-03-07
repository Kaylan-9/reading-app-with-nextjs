import { countPages, getAllBooks } from "@/lib/db/books";
import Header from '@/components/Header';
import Mangas from '@/components/Mangas';
import Head from 'next/head';
import Pagination from "@/components/Pagination";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import ReadingAside from "@/components/ReadingAside";
import { getAllCategory } from "@/lib/db/categories";
import { ICategory } from "@/types/data/Category";


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

export default function Index({currentPage, nOfPages, books, categories}: IHomePageProps & {currentPage: number, categories: ICategory[]}) {
  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <ReadingAside categories={categories}/>
    <Header>
      <Pagination baseURL={`/page`} current={currentPage} nOfPages={nOfPages}/>
    </Header>
    <main>
      <Mangas title='Mangás' books={books}/>
    </main>
  </>)
};