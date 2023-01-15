import styles from "./components.module.css";
import Image from "./Image";

interface ArticleInterface {
  title: string
}

const imagens: string[] = ["teste.png", "teste.png", "teste.png"];

export default function Article({title} : ArticleInterface) {
  return <li>
    <article className={styles.mangaarticle}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.imagelist}>
        {imagens.map((url) => <Image url={url}/>)}
      </ul>
    </article>
  </li>
}