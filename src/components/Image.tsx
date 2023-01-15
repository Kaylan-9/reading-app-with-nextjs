import styles from "./components.module.css";
import { css } from "@emotion/css";
import testeImage from '../../public/teste.png'

interface ImageInterface {
  url: string
}

export default function Image({url} : ImageInterface) {
  return <li>
    <div style={{background: `url()`}} className={styles.image}/>
  </li>
}