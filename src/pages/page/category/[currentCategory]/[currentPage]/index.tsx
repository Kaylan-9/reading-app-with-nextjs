import { countPages, getAllBooks, getAllBooksByCategory } from "@/lib/db/books";
import { GetStaticProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import Head from 'next/head';
import Pagination from "@/components/sections/header/Pagination";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import { getAllCategory } from "@/lib/db/categories";

export async function getStaticPaths() {
  type TPath = {
    params: {
      currentCategory: string;
      currentPage: string;
    }
  };

  let paths: TPath[] = [];
  const categories= await getAllCategory();

  await Promise.all(categories.map(async category => {    
    const nOfPages = await countPages(category.id);
    for(let i=0;i<=nOfPages;i++) {
      paths.push({
        params: {
          currentCategory: String(category.id), 
          currentPage: String(i)
        }
      });
    }
  }));

  return {
    paths,
    fallback: false,
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const currentCategory= Number(typeof params?.currentCategory==='string' ? params?.currentCategory : 0);
  const currentPage = Number(params?.currentPage ?? 0);
  const books= await getAllBooksByCategory(currentPage, currentCategory);
  const nOfPages= await countPages(currentCategory);

  return {
    props: {
      currentCategory,
      currentPage,
      books,
      nOfPages
    }, 
    revalidate: 20
  }
}

export default ({currentCategory, currentPage, nOfPages, books}: IHomePageProps & {
  currentPage: number;
  currentCategory: number;
}) => {

  return (<>
    <Head>
      <title>Reading App - {currentCategory}</title>
    </Head>
    <Header>
      <Pagination baseURL={`/page/category/${currentCategory}`} current={currentPage} nOfPages={nOfPages}/>
    </Header>
    <main>
      <Mangas title={`Mangás de ${currentCategory}`} books={books}/>
    </main>
  </>)
};