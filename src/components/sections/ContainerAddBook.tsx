import { useCallback, useEffect, useRef, useState } from 'react';
import Select from '../ultis/Select';
import SelectedImages from '../ultis/SelectedImages';
import InputLabel from "../ultis/InputLabel";
import TextArea from '../ultis/TextArea';
import Button from '../ultis/Button';
import { css } from '@emotion/css';

export default function ContainerBookAdd() {
  const booknameinput = useRef<HTMLInputElement>(null);
  const bookimagesinput = useRef<HTMLInputElement>(null);
  const bookdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const bookcategoryselect = useRef<HTMLInputElement>(null);
  const [newImages, setNewImages] = useState<FileList | []>([]);
  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);
  const handleAddBook = useCallback(async () => {
    const formData = new FormData();
    formData.append('bookpath', '');
    formData.append('bookname', booknameinput.current?.value ?? '');
    formData.append('bookdescription', bookdescriptioninput.current?.value ?? '');
    formData.append('bookcategorie', bookcategoryselect.current?.value ?? '');
    const validFiles: File[] = [];
    for (let i = 0; i < newImages.length; i++) {
      const file = newImages[i];
      if (!file.type.startsWith("image")) {
        alert(`File with index ${i} is invalid`);
        continue;
      }
      validFiles.push(file);
    }
    validFiles.forEach((file) => formData.append("bookimages", file));
    await fetch('/api/book/create', {
      method: 'POST',
      body: formData
    });
  }, [newImages]);

  useEffect(() => {
    for(let newImage of Array.from(newImages)) {
      let fileReader = new FileReader();
      fileReader.onload = ({target}) => {
        const result = target?.result;
        if(typeof result === 'string') {
          setFilesDataURL((oldfilesDataURL) => [...oldfilesDataURL, result]);
        }
      }
      fileReader.readAsDataURL(newImage);
    }
  }, [newImages]);

  return (<form className={css`
    display: grid;
    grid-template-columns: 260px auto min-content;
    grid-template-rows: repeat(3, auto);
    grid-template-areas: 
      'booknameinputandlabel bookdescriptiontextarea .'
      'bookcategoryselect bookdescriptiontextarea addbookbutton'
      'selectedimages selectedimages selectedimages'
    ;
    gap: 20px;
  `}>
    <InputLabel ref={booknameinput} label="Nome" placeholder="Nome do mangá ou HQ" area={`booknameinputandlabel`}/>
    <Select ref={bookcategoryselect}/>
    <TextArea ref={bookdescriptioninput} rows={2} placeholder="Descrição" area={`bookdescriptiontextarea`}/>
    <SelectedImages ref={bookimagesinput} setNewImages={setNewImages} filesDataURL={filesDataURL}/>
    <Button type="button" onClick={handleAddBook} value="Adicionar" area={`addbookbutton`}/>
  </form>);
}