import styles from '@/components/components.module.css';
import Header from '@/components/Header';
import InputLabel from '@/components/InputLabel';
import Manga from '@/components/lists/Manga';
import Select from '@/components/Select';
import { Books } from '@/lib/db';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineManageSearch } from 'react-icons/md';

const MangaEditSt = styled.div`
  & > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(183px, 1fr));
    row-gap: 65px;
    column-gap: 50px;
    width: 100%;
    @media(max-width:700px) {
      display: flex;
      justify-content: space-between !important;
      padding: 75px 10px;
      gap: 50px;
      flex-direction: column !important;
    }
  }
  & > .inputicon {
    grid-area: inputiconremove;
    align-items: center;
    display: flex;
    gap: 10px;
    font-size: 25px;
    @media(max-width:700px) {
      display: grid;
      grid-template-columns: min-content auto;
    }
    & > input {
      border: none;
      border-radius: 15px;
      padding: 15px;
      font-weight: bold;
      font-family: var(--font-one);
      background-color: #0c0c0c;
      color: white;
      min-width: 250px;
      outline: none;
      &::-webkit-input-placeholder {
        color: white;
      }
    }
  }
`;


const MangaEdit = () => {
  const [ searchContent,  setSearchContent ] = useState<Books[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null); 
  const router = useRouter();

  return (<MangaEditSt>
    <div className="inputicon">
        <MdOutlineManageSearch onClick={async () => {
          
          const dataToDoSearch = JSON.stringify({
            title: searchInput.current?.value==="" ? false : searchInput.current?.value,
          });
        
          const resultResearch = await fetch('/api/book/search', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: dataToDoSearch
          });
          const dataResearch = await resultResearch.json();
          console.log(dataResearch)
          setSearchContent(dataResearch.research as Books[]);
        }}/>
        <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
      </div>
    <ul>
      {searchContent ? searchContent.map((book: Books) => 
          <Manga
            key={book.id+book.title}
            id={book.id as number}
            title={book.title} 
            path={book.path} 
            images={book.imagepaths}
            options={[
              {Icon: <BiTrash/>, async func(id){
                const dataToDoDelete = JSON.stringify({id, path: book.path});
                await fetch('/api/book/delete', {
                  method: 'DELETE',
                  headers: {'Content-Type' : 'application/json'},
                  body: dataToDoDelete
                });
                router.push('/');
              }}
            ]}
          />
        ) : null}
    </ul>
  </MangaEditSt>);
}


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
                  return (<li key={fileDataUrl}>
                    <img src={fileDataUrl} alt="preview"/>
                  </li>)
                })}
              </ul>
            <input type="button" onClick={handleAddBook} value="Adicionar"/>
          </form>) :
          <MangaEdit/>
        }
      </div>
    </main>
  </div>);
}
