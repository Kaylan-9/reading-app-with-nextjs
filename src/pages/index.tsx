import Header from '../components/Header';
import Head from 'next/head';
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";
import ReadingAside from "@/components/ReadingAside";
import useMangas from '../hooks/useMangas';
import { ICategory } from '@/types/data/Category';
import Mangas from '@/components/Mangas';
import { morePopular as _morePopular } from '@/lib/db/books';
import Main from '@/components/Main';

export const getStaticProps: any = async () => {
  const categories= await getAllCategory();
  const morePopular= await _morePopular();
  return {
    props: {
      categories,
      morePopular
    }
  }
};

export default function Index({categories, morePopular}: {morePopular: IBookUserCategories[], categories: ICategory[]}) {
  let { mangas } = useMangas(morePopular.map(item=> item.id));
  return (<>
    <Head><title>Reading App</title></Head>
    <Header/>
    <Main>
      <ReadingAside categories={categories}/>
      <Mangas title='Mais populares' books={morePopular}/>
      <Mangas title='Outros' books={mangas}/>
    </Main>
  </>);
};
