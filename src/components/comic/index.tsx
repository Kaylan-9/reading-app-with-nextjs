import { useContext } from 'react';
import { motion } from 'framer-motion';
import Comic from './styled';
import { ComicViewerContext } from '@/contexts/ComicViewerContext';
import IComic from '@/types/components/IComic';
import PresentationImg from '@/components/PresentationImg';

export default ({ id, title, images, children }: IComic) => {
  const { handleComicViewer } = useContext(ComicViewerContext);
  return <motion.li>
    <Comic>
      <h3 className="title">{title}</h3>
      <ul className="img-list" onClick={() => handleComicViewer({ type: 'id', id })}>
        {images?.map((img, indice) => {
          if (indice < 3) return <PresentationImg
            id={`image-${indice}`}
            key={img.name + img.id}
            title={title}
            name={img.name} />;
        })}
      </ul>
      <ul className="options">{children}</ul>
    </Comic>
  </motion.li>;
};