import { ReactNode } from "react";
import { GrFavorite } from "react-icons/gr";
import { BiSpreadsheet } from "react-icons/bi";
import styles from "./components.module.css";
import Image from "./Img";

interface ArticleInterface {
  title: string
}

type OptionType = {
  Icon: ReactNode,
  func: () => void,
}

const images: string[] = ["teste.png", "teste.png", "teste.png"];

function Option({Icon} : OptionType) {
  return  (<li>
    <button>
      {Icon}
    </button>
  </li>);
}

export default function Article({title} : ArticleInterface) {
  return <li>
    <article className={styles.mangaarticle}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.imagelist}>
        {images.map((url) => <Image url={url}/>)}
      </ul>
      <ul className={styles.mangaoptions}>
        <Option Icon={<GrFavorite/>} func={()=>{}}/>
        <Option Icon={<BiSpreadsheet/>} func={()=>{}}/>
      </ul>
    </article>
  </li>
}