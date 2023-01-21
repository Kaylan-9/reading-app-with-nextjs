import styles from '@/components/components.module.css';
import Header from '@/components/Header';
import InputLabel from '@/components/InputLabel';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export default function Profile() {
  const [newImages, setNewImages] = useState<FileList | []>([]);
  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);
  const booknameinput = useRef<HTMLInputElement>(null);
  const bookimagesinput = useRef<HTMLInputElement>(null);
  const bookdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const bookcategorieselect = useRef<string>("");
  const handleAddBook = useCallback(async () => {
    const formData = new FormData();
    formData.append('bookpath', '');
    formData.append('bookname', booknameinput.current?.value ?? '');
    formData.append('bookdescription', bookdescriptioninput.current?.value ?? '');
    formData.append('bookcategorie', bookcategorieselect.current);
    
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

  return (<div className={styles.profilepage}>
    
    <Header/>
    <main>
      <div>
        <form>
          <InputLabel 
            ref={booknameinput} 
            label="Nome" 
            placeholder="Nome do mangá ou HQ" 
            id="booknameinput"
          />
          <select onChange={(e: any) => {
            const value = e.target.value
            bookcategorieselect.current = value;
          }}>
            <option value="Shōnen">Shōnen</option>
            <option value="Seinen">Seinen</option>
            <option value="Shōjo">Shōjo</option>
            <option value="Yaoi">Yaoi</option>
            <option value="Yuri">Yuri</option>
            <option value="Josei">Josei</option>
          </select>
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
        </form>
      </div>
    </main>
  </div>);
}
