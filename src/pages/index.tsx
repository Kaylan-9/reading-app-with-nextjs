import Header from '../components/Header';
import Head from 'next/head';
import { IComicUserCategories } from "@/types/data/Comics";
import { getAllCategory } from "@/lib/db/categories";
import ReadingAside from "@/components/ReadingAside";
import useMangas from '../hooks/useMangas';
import { ICategory } from '@/types/data/Category';
import Mangas from '@/components/comics';
import { morePopular as _morePopular } from '@/lib/db/books';
import Main from '@/styles/Main';

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

export default function Index({categories, morePopular}: {morePopular: IComicUserCategories[], categories: ICategory[]}) {
  let { mangas } = useMangas(morePopular.map(item=> item.id));
  return (<>
    <Head>
      <title>App de leitura</title>
      <meta name={`keywords`} content={`Histórias em Quadrinhos (HQ), Mangás, Manhwas, Manhuas, Leitura`}/>
      <meta name={`description`} content={`Sinta-se livre para visitar e ler diferentes tipos de Histórias em Quadrinhos (HQ), Mangás, Manhwas, Manhuas e etc. E caso seja um criador aproveite e use a plataforma para divulgar o seu trabalho.`}/>
      <meta name="rating" content="general" />
    </Head>
    <Header/>
    <Main>
      <ReadingAside categories={categories}/>
      <Mangas title='Mais populares' books={morePopular}/>
      <Mangas title='Outros' books={mangas}/>
    </Main>
  </>);
};
