import styles from "./components.module.css";
import { css } from "@emotion/css";
import testeImage from '../../public/teste.png'
import styled from '@emotion/styled';

interface ImageInterface {
  url: string
}

const ImagesStyle = styled.div<{url: string}>`
  min-width: 110px;
  min-height: 110px;
  background-image: url(${({url}) => url});
  background-position: center !important;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  position: absolute;
  border-radius: 10px;
`;

export default function Image({url} : ImageInterface) {
  return <li>
    <ImagesStyle url={url} className={styles.image}/>
  </li>
}