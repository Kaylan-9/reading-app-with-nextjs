import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Select from '../ultis/Select';
import SelectedImages from '../ultis/SelectedImages';
import InputLabel from "../ultis/InputLabel";
import TextArea from '../ultis/TextArea';
import Button from '../ultis/Button';
import styled from '@emotion/styled';
import { SessionContext, SessionContextInterface } from '@/contexts/SessionContext';

const FormAddBook = styled.form`
  display: grid;
  grid-template-columns: 260px auto min-content;
  grid-template-rows: repeat(3, auto);
  grid-template-areas: 
    'booknameinputandlabel bookdescriptiontextarea .'
    'bookcategoryselect bookdescriptiontextarea addbookbutton'
    'selectedimages selectedimages selectedimages'
  ;
  gap: 20px;
`;

const FormAddCategory = styled.form`
  display: flex;
  gap: 25px;
  align-items: center;
  width: 100%;
  margin: 40px 0;
`;


export default function ContainerBookAdd() {
  const { userSession } = useContext<SessionContextInterface>(SessionContext);
  const booknameinput = useRef<HTMLInputElement>(null);
  const bookimagesinput = useRef<HTMLInputElement>(null);
  const bookdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const bookcategoryselect = useRef<HTMLInputElement>(null);
  const bookcategorynameinput = useRef<HTMLInputElement>(null);

  const [newImages, setNewImages] = useState<FileList | []>([]);
  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);
  const handleAddBook = useCallback(async () => {
    const formData = new FormData();
    formData.append('bookpath', '');
    formData.append('bookname', booknameinput.current?.value ?? '');
    formData.append('bookdescription', bookdescriptioninput.current?.value ?? '');
    formData.append('bookidcategory', bookcategoryselect.current?.value ?? '');
    formData.append('bookiduser', String(userSession.userdata?.id ?? ''));
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

  const handleAddCategory = useCallback(async () => {
    const dataResponse = (await fetch('/api/category/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: (bookcategorynameinput?.current?.value ?? '')
      })
    }));
    console.log(dataResponse);
  }, []);


  return (<>                
    <FormAddBook>
      <InputLabel ref={booknameinput} label="Nome" placeholder="Nome do mangá ou HQ" area={`booknameinputandlabel`}/>
      <Select ref={bookcategoryselect}/>
      <TextArea ref={bookdescriptioninput} rows={2} placeholder="Descrição" area={`bookdescriptiontextarea`}/>
      <SelectedImages ref={bookimagesinput} setNewImages={setNewImages} filesDataURL={filesDataURL}/>
      <Button type="button" onClick={handleAddBook} value="Adicionar" area={`addbookbutton`}/>
    </FormAddBook>

    <FormAddCategory>
      <InputLabel ref={bookcategorynameinput} label="Categoria" placeholder="Categoria" area={`bookcategoryinputandlabel`}/>
      <Button type="button" onClick={handleAddCategory} value="Adicionar" area={`addcategorybutton`}/>
    </FormAddCategory>
  </>);
}