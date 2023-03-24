import { ISelectedImages } from '@/types/components/ultis/ISelectedImages';
import styled from '@emotion/styled';
import { forwardRef, ChangeEvent } from 'react';

const ListSelectedImages = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5vh;
  grid-area: selectedimages;
  & > li {
    height: 20vh;
    flex-grow: 1;
    border-radius: 1.25vh;
    & > img {
      max-height: 100%;
      min-width: 100%;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
  & > label[for="bookimagesinput"] {
    width: 15vh;
    min-height: 20vh;
    min-width: 16vh !important; 
    grid-area: imageselectionbutton;
    background-color: rgb(var(--secondary-bg));
    border-radius: 1.25vh;
    object-fit: cover;
    vertical-align: bottom;
    color: #ffffff;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-items: center;
    align-items: center;
  }
`;



const SelectedImages = forwardRef<HTMLInputElement, ISelectedImages>(({setNewImages, filesDataURL}, ref) => {
  return (<>
    <input 
      ref={ref} 
      id="bookimagesinput" 
      style={{
        display: 'none'
      }}
      type="file" 
      multiple 
      onChange = {(e: ChangeEvent<HTMLInputElement>) => {
        if(FileReader && e.currentTarget.files && e.currentTarget.files.length) setNewImages(e.currentTarget.files);
      }}
    />
    <ListSelectedImages>
      <label htmlFor="bookimagesinput">Clique e selecione as imagens desejadas</label>
      {filesDataURL.map((fileDataUrl: string) => {
        return (<li key={fileDataUrl}>
          <img src={fileDataUrl} alt="preview"/>
        </li>)
      })}
    </ListSelectedImages>
  </>);
});

SelectedImages.displayName= 'SelectedImages';

export default SelectedImages;
