import styles from '@/components/components.module.css';
import Header from '@/components/Header';
import InputLabel from '@/components/InputLabel';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

export default function Profile() {
  const [newImages, setNewImages] = useState<FileList | []>([]);
  const [filesDataURL, setFilesDataURL] = useState<string[]>([]);
  const comicnameinput = useRef<HTMLInputElement>(null);
  const comicimagesinput = useRef<HTMLInputElement>(null);
  const comicdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const comiccategorie = useRef<string>("");
  const handleAddBook = useCallback(async () => {
    return;
  }, []);

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
            ref={comicnameinput} 
            label="Nome" 
            placeholder="Nome do mangá ou HQ" 
            id="comicnameinput"
          />
          <select onChange={(e: any) => {
            const value = e.target.value
            comiccategorie.current = value;
          }}>
            <option value="Shōnen">Shōnen</option>
            <option value="Seinen">Seinen</option>
            <option value="Shōjo">Shōjo</option>
            <option value="Yaoi">Yaoi</option>
            <option value="Yuri">Yuri</option>
            <option value="Josei">Josei</option>
          </select>
          <textarea ref={comicdescriptioninput} rows={2} className={styles.textarea} placeholder="Descrição"/>

          <input 
            ref={comicimagesinput} 
            id="comicimagesinput" 
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
            <label htmlFor="comicimagesinput">
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
