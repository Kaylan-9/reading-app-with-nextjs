import styles from '@/components/components.module.css';
import Header from '@/components/Header';
import InputLabel from '@/components/InputLabel';
import Select from '@/components/Select';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export default function Profile() {
  const [newImages, setNewImages] = useState<FileList | []>([]);
  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);
  const [optionPicker, setOptionPicker] = useState<number>(0);

  const booknameinput = useRef<HTMLInputElement>(null);
  const bookimagesinput = useRef<HTMLInputElement>(null);
  const bookdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const bookcategoryselect = useRef<HTMLInputElement>(null);

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
    const addBook = await fetch('/api/book/create', {
      method: 'POST',
      body: formData
    });

    console.log(await addBook.json());
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

  type OptionsProfileType = {
    options: {
      name: string,
      onClick: any
    }[]
  }

  const OptionsProfileSt = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 0px 75px 0px;
    & > li > button {
      background-color: transparent;
      cursor: pointer;
      color: white;
      font-family: 'Roboto', sans-serif !important;
      font-size: 16px;
      border: none;
      border-top: solid 1.5px rgb(138, 138, 138);
      padding: 15px 30px;
    }   
  `;

  const OptionsProfile = ({options} : OptionsProfileType) => {
    return (<OptionsProfileSt>
      {options.map((option, indice) => {
        return (<li key={option.name+indice}>
          <button 
            className={optionPicker===indice ? css`
              border: solid 2px rgb(138, 138, 138) !important;
              border-radius: 0 0 15px 15px;
              border-top: none !important;
            ` : ''}
            onClick={() => {
              setOptionPicker(indice);
              option.onClick();
            }}
          >
            {option.name}
          </button>
        </li>);
      })}
    </OptionsProfileSt>);
  }

  return (<div className={styles.profilepage}>
    <Header/>
    <main>
      <div>
        <OptionsProfile options={[
          {name:'adicionar', onClick(){}},
          {name:'remover', onClick(){}},
        ]}/>

        {(optionPicker==0) ?
          (<form>
            <InputLabel 
              ref={booknameinput} 
              label="Nome" 
              placeholder="Nome do mangá ou HQ" 
              id="booknameinput"
            />
            <Select ref={bookcategoryselect}/>
            <textarea ref={bookdescriptioninput} rows={2} className={styles.textarea} placeholder="Descrição"/>

            <input 
              ref={bookimagesinput} 
              id="bookimagesinput" 
              type="file" 
              multiple 
              onChange = {
                (e: ChangeEvent<HTMLInputElement>) => {
                  if( 
                      FileReader && 
                      e.currentTarget.files && 
                      e.currentTarget.files.length
                    ) {
                    setNewImages(e.currentTarget.files);
                  }
                }
              }/>

              <ul className={styles.listselectedimages}>
                <label htmlFor="bookimagesinput">
                  Clique e selecione as imagens desejadas
                </label>
                {filesDataURL.map((fileDataUrl: string) => {
                  return (<li>
                    <img src={fileDataUrl} alt="preview"/>
                  </li>)
                })}
              </ul>
            <input type="button" onClick={handleAddBook} value="Adicionar"/>
          </form>) :
          null
        }
      </div>
    </main>
  </div>);
}
