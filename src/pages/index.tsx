import { Inter } from '@next/font/google'
import styles from '../app/page.module.css'
import Article from '@/components/Article'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <ul className={styles.listmangas}>
        <Article title={`Manga title one`}/>
        <Article title={`Manga title`}/>
      </ul>
    </main>
  )
}
