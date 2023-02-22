import { countPages, getAllBooks, getAllBooksByCategory } from "@/lib/db/books";
import { GetStaticProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import Head from 'next/head';
import Pagination from "@/components/sections/header/Pagination";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import { getAllCategory } from "@/lib/db/categories";
import { IBookUserCategories } from "@/types/data/Books";


export async function getStaticPaths() {
  type TPath = {
    params: {
      currentCategory: string;
      currentPage: string;
    }
  };

  let paths: TPath[] = [];
  const categories= await getAllCategory();
  categories.map(async category => {
    const nOfPages = await countPages(category.name);
    for(let i=0;i<=nOfPages;i++) {
      paths.push({
        params: {
          currentCategory: category.name, 
          currentPage: String(i)
        }
      });
    }
  });

  return {
    paths,
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const currentCategory = params?.currentCategory;
  let currentPage = Number(params?.currentPage ?? 0);
  let nOfPages = 0;
  let books: IBookUserCategories[] | any = []; 
  if(typeof currentCategory==='string') {
    books= await getAllBooksByCategory(currentPage, currentCategory);
    nOfPages= await countPages(currentCategory);
  }
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
  currentCategory: string;
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