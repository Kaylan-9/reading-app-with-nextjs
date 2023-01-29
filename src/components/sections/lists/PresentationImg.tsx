import styled from '@emotion/styled';

interface ImageInterface {
  id: string;
  url: string;
}

const ImagesStyle = styled.div<{url: string}>`
  min-width: 140px;
  min-height: 200px;
  background-image: url(${({url}) => url});
  background-position: center !important;
  background-size: 100% !important;
  background-repeat: no-repeat !important;
  position: absolute;
  border-radius: 10px;
`;

export default function Image({id, url} : ImageInterface) {
  return <li id={id}>
    <ImagesStyle url={url}/>
  </li>
}