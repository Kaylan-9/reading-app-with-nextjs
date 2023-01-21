import { ReactNode, useEffect } from "react";
import { GrFavorite } from "react-icons/gr";
import { BiSpreadsheet } from "react-icons/bi";
import styles from "./components.module.css";
import Img from "./Img";
import { Images } from "@/lib/db";

interface ArticleInterface {
  title: string;
  path: string;
  images: Images[];
}

type OptionType = {
  Icon: ReactNode,
  func: () => void,
}

function Option({Icon} : OptionType) {
  return  (<li>
    <button>
      {Icon}
    </button>
  </li>);
}

export default function Article({title, path, images} : ArticleInterface) {
  return <li>
    <article className={styles.mangaarticle}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.imagelist}>
        {images?.map((img, indice) => {
          if(indice<3) {
            return <Img 
              key={img.name+img.id} 
              url={`/images/${path}/${img.name}.${img.type}`}
            />
          }
        })}
      </ul>
      <ul className={styles.mangaoptions}>
        <Option Icon={<GrFavorite/>} func={()=>{}}/>
        <Option Icon={<BiSpreadsheet/>} func={()=>{}}/>
      </ul>
    </article>
  </li>
}