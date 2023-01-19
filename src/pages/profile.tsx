import styles from '@/components/components.module.css';
import Header from '@/components/Header';
import InputLabel from '@/components/InputLabel';
import { useCallback, useRef, useState } from 'react';


export default function Profile() {
  const comicnameinput = useRef<HTMLInputElement>(null);
  const comicimagesinput = useRef<HTMLInputElement>(null);
  const comicdescriptioninput = useRef<HTMLTextAreaElement>(null);
  const comiccategorie = useRef<string>("");
  const handleAddBook = useCallback(async () => {
    const title = comicnameinput.current?.value;
    // const images = comicimagesinput.current?.files?.map((image: string) => {
    //   console.log(image);
    // });

    const result = await fetch('/api/book')
  }, []);

  return (<div className={styles.profilepage}>
    <Header/>
    <main>
      <div>
        <form>
          <InputLabel ref={comicnameinput} label="Nome"/>
          <textarea ref={comicdescriptioninput} rows={2} className={styles.textarea} placeholder="Descrição"/>
          <input ref={comicimagesinput} type="file" multiple/>
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
          <input type="button" onClick={handleAddBook} value="Logar"/>
        </form>
      </div>
    </main>
  </div>);
}
