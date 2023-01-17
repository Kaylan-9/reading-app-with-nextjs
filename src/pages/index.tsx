import { Inter } from '@next/font/google';
import styles from '../components/components.module.css';
import { GetServerSideProps } from "next";
import Article from '@/components/Article';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import { Book, getAllBooks } from 'lib/db';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async ()  => {
  const books = await getAllBooks();
   return {
    props: {
      books,
    }
   }
}

interface PostProps {
  books: Book[]
}

export default function Home({books} : PostProps) {
  return (<>
    <Header/>
    <Aside/>
    <main className={styles.main}>
      <ul className={styles.list_mangas}>
        {JSON.stringify(books, null, 4)}


        <Article title={`Manga title one`}/>
        <Article title={`Manga title two`}/>
        <Article title={`Manga title three`}/>
        <Article title={`Manga title four`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title two`}/>
        <Article title={`Manga title three`}/>
        <Article title={`Manga title four`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title two`}/>
        <Article title={`Manga title three`}/>
        <Article title={`Manga title four`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title two`}/>
        <Article title={`Manga title three`}/>
        <Article title={`Manga title four`}/>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title`}/>
      </ul>
    </main>
  </>)
}
