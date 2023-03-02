import { IImg } from '@/types/components/IImg';
import styled from '@emotion/styled';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const ImagesStyle = styled(AdvancedImage)`
  max-width: 140px;
  max-height: 200px;
  position: absolute;
  border-radius: 10px;
`;

export default function Image({id, title, name} : IImg) {
  const myImage = new CloudinaryImage(`mangas-${title}-${name}`, {cloudName: 'dxfae0yk7'});
  return (<li id={id}>
    <ImagesStyle cldImg={myImage}/>
  </li>);
}