import { IImg } from '@/types/components/IImg';
import { CloudinaryImage } from '@cloudinary/url-gen';
import PresentationImg from './styled';

export default ({id, title, name} : IImg) => {
  const myImage = new CloudinaryImage(`mangas-${title}-${name}`, {cloudName: 'dxfae0yk7'});
  return (<li id={id}>
    <PresentationImg cldImg={myImage}/>
  </li>);
}