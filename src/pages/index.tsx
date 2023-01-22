import { Inter } from '@next/font/google';
import styles from '../components/components.module.css';
import { GetServerSideProps } from "next";
import Header from '@/components/Header';
import { Books, getAllBooks } from '@/lib/db';
import Mangas from '@/components/lists/Mangas';
const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async ({ req, res })  => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=50'
  )

  const books = await getAllBooks();
  return {props: {books}}
}

export default function Home({books}: {books: Books[]}) {
  return (<>
    <Header/>
    <main className={styles.main}>
      <Mangas books={books}/>
    </main>
  </>)
}
