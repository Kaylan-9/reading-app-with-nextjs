import { Inter } from '@next/font/google';
import styles from '../components/components.module.css';
import { GetServerSideProps } from "next";
import Article from '@/components/Article';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import { Books, getAllBooks } from '@/lib/db';

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
  books: Books[]
}

export default function Home({books} : PostProps) {
  return (<>
    <Header/>
    <Aside/>
    <main className={styles.main}>
      <ul className={styles.list_mangas}>
        {books.map((book: Books) => 
          <Article 
            title={book.title} 
            path={book.path} 
            images={book.imagepaths}
          />
        )}
      </ul>
    </main>
  </>)
}
