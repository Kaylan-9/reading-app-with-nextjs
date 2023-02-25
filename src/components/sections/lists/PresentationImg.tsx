import { IImg } from '@/types/components/IImg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ImagesStyle = styled(motion.div)<{url: string}>`
  min-width: 140px;
  min-height: 200px;
  background-image: url(${({url}) => url});
  background-position: center !important;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  position: absolute;
  border-radius: 10px;
`;

export default function Image({id, url} : IImg) {
  const variants={
    initial: {x: 12.5},
    whileInView: {x: 0}
  };

  return (<li id={id}>
    <ImagesStyle 
      url={url}
      variants={variants}
      initial='initial'
      whileInView='whileInView'
      transition={{delay: .25}}
    />
  </li>);
}