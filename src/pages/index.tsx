import { Inter } from '@next/font/google'
import styles from '../app/page.module.css'
import Article from '@/components/Article'
import Header from '@/components/Header'
import Aside from '@/components/Aside'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (<>
    <Header/>
    <Aside/>
    <main className={styles.main}>
      <ul className={styles.listmangas}>
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
