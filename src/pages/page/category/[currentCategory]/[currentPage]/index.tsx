import { countPages, getAllBooksByCategory } from "@/lib/db/books";
import Header from '@/components/Header';
import Mangas from '@/components/Mangas';
import Head from 'next/head';
import Pagination from "@/components/Pagination";
import { IPaginationPageProps } from "@/types/pages/IPaginationPageProps";
import { getAllCategory, getCategory } from "@/lib/db/categories";
import { ICategory } from "@/types/data/Category";
import ReadingAside from "@/components/ReadingAside";

async function getPaths() {
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
  return paths;
}

export async function getStaticPaths() {
  return {
    paths: await getPaths(),
    fallback: 'blocking',
  }
};

export async function getStaticProps(context: any) {
  const redirect= {
    redirect: {
      destination: '/'
    }
  };
  const { params } = context;
  if(params.currentCategory!==undefined && params.currentPage!==undefined && /[0-1]*/gi.test(params.currentPage) && /[0-1]*/gi.test(params.currentCategory)) {
    const currentCategory=  Number(params.currentCategory);
    const currentPage = Number(params.currentPage);
    const paths= await getPaths();
    let pathExists= false;
    for(let {params} of paths) {
      pathExists= (Number(params.currentCategory)===currentCategory && Number(params.currentPage)===currentPage);
      if(pathExists) break; 
    };
    const category=  await getCategory(currentCategory);

    if(pathExists) {
      const books= await getAllBooksByCategory(currentPage, currentCategory);
      const nOfPages= await countPages(currentCategory);
      const categories= await getAllCategory();

      return {
        props: {
          currentCategory,
          currentPage,
          category,
          categories,
          books,
          nOfPages
        }, 
        revalidate: 20
      }
    }
    return redirect;
  }
  return redirect;
}

export default function Index({currentCategory, currentPage, nOfPages, category, categories, books}: IPaginationPageProps & {
  currentPage: number;
  currentCategory: number;
  category: ICategory;
  categories: ICategory[];
}) {
  return (<>
    <Head><title>Reading App - {category?.name} </title></Head>
    <Header><Pagination baseURL={`/page/category/${currentCategory}`} current={currentPage} nOfPages={nOfPages}/></Header>
    <ReadingAside categories={categories} doNotShow={[category?.name ?? '']}/>
    <main><Mangas title={`Mangás de ${category?.name}`} books={books}/></main>
  </>)
};