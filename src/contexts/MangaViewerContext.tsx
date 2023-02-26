import { IPropsMangaViewer } from "@/types/contexts/MangaViewerContext/components/IPropsMangaViewer";
import { IMangaViewerReducerAction } from "@/types/contexts/MangaViewerContext/reducers/MangaViewerReducerAction";
import { IMangaViewerReducerState } from "@/types/contexts/MangaViewerContext/reducers/MangaViewerReducerState";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { HiViewGrid } from 'react-icons/hi';
import { AiFillRead } from 'react-icons/ai';
import styled from "@emotion/styled";
import { createContext, ReactNode, Reducer, useCallback, useEffect, useReducer, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IBookUserCategories } from "@/types/data/Books";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import CategoryButton from "@/styles/components/CategoryButton";
import { css } from "@emotion/css";

const initialValueMangaViewerReducer: IMangaViewerReducerState = {
  id: null
};

export function mangaViewerReducer(state: IMangaViewerReducerState, action: IMangaViewerReducerAction): IMangaViewerReducerState {
  let { id }= state;
  if(action.type==='id' && action.id!==undefined) {
    id= action.id;
  }
  return {
    id
  };
};


const initialValueMangaViewer = {
  mangaViewer: initialValueMangaViewerReducer,
  handleMangaViewer: mangaViewerReducer
};

export const MangaViewer= styled.div`
  z-index: 6;
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: min-content auto;
  grid-template-areas: 
    'btn-close .'
    'manga-img manga-container'
    'manga-pages manga-pages'
  ;
  row-gap: 3em;
  column-gap: 3em;
  backdrop-filter: blur(2px); 
  background-color: rgba(0, 0, 0, 0.411);
  filter: blur(0px);
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 5em calc(((100vw - 1920px) / 2) + 8em);
  > img {
    width: 18.75em;
    border-radius: 1em;
    grid-area: manga-img;
  }
  > .manga-container {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: flex-start;
    grid-area: manga-container;
    gap: 2em;
    background-color: rgb(var(--background));
    padding: 2em;
    border-radius: 2em;
    > .author {
      display: flex;
      align-items: center;
      flex-flow: row wrap;
      gap: 5em;
      > .author-img {
        border-radius: 5em;
        width: 5em;
      }
      > .author-name {
        font-family: var(--font-one);
        font-weight: bolder;
      }
    }
    > .btns {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      gap: 2.5em;
      padding: 15px;
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 2em;
      > li > button {
        background-color: transparent;
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        > svg {
          font-size: 2em;
          > * {
            color: white;
          }
        }
      }
    }
    > .body-text {
      > .title {
        font-family: var(--font-one);
        margin-bottom: 1em;
      }
      > .text {
        font-family: var(--font-one);
        color: white;
      }
    }
  }
  > svg {
    font-size: 3em;
    grid-area: btn-close;
    cursor: pointer;
  }
`;

const viewModes = [
  css`  
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    > li > img {  
      width: 50em;
    }
  `,
  css`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 1em;
    > li > img {  
      flex: auto;
      height: 25em;
    }
  `
]

export const MangaViewerContext = createContext<IPropsMangaViewer>(initialValueMangaViewer);

export default function MangaViewerProvider({children}: {children: ReactNode}) {
  const router= useRouter();
  const [mangaViewer, handleMangaViewer] = useReducer<Reducer<IMangaViewerReducerState, IMangaViewerReducerAction>>(mangaViewerReducer, initialValueMangaViewerReducer);
  const [data, setData] = useState<IBookUserCategories | null>(null);
  const [marked, setMarked] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<number>(0);

  const {data: session}: {data: any} = useSession();
  const changeMark= useCallback(async () => {
    setMarked(oldMarked=> !oldMarked);
    const params= {
      method: 'POST',
      crendentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isfavorite: marked,
        userId: session.user.id, 
        bookId: mangaViewer.id
      })
    }
    await fetch(`/api/favorite/changemark`, params);
  }, [session, mangaViewer, marked]);

  useEffect(() => {
    const fetchData = async () => {
      let params = {
        method: `POST`,
        crendentials: `same-origin`,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: mangaViewer.id})
      };

      {
        const request= await fetch(`/api/book/data`, params);
        const response: any = await request.json();
        setData(response.book);
      }
      {
        params.body = JSON.stringify({
          bookID: mangaViewer.id,
          customerID: session.id
        });  
        const request= await fetch(`/api/favorite/isfavorite`, params);
        const response: any = await request.json();
        setMarked(response.data.marked);
      }

    };
    if(typeof mangaViewer.id==='number') fetchData();
  }, [mangaViewer]);

  return (<MangaViewerContext.Provider value={{mangaViewer, handleMangaViewer}}>
    {children}
    {mangaViewer.id!==null ? (<MangaViewer>
      {data!==null ? (
        <img
          src={`https://storage.cloud.google.com/xyz2-book-page-image-data/${data.imagepaths[0].name}`} 
          alt={`capa do mangá`}
        />) : 
        null
      }

      <IoIosCloseCircle onClick={() => handleMangaViewer({type: 'id', id: null})}/>
      <div className="manga-container">
        <ul className="btns">
          <li><button onClick={changeMark}>{marked ? (<IoHeart/>) : (<IoHeartOutline/>)}</button></li>
          <li><button onClick={() => setShow(oldShow=> !oldShow)}><AiFillRead/></button></li>
          {show ? (<li><button onClick={() => setViewMode(oldViewMode =>
              viewModes.length-1==oldViewMode ? 0 : oldViewMode+1
          )}><HiViewGrid/></button></li>) : null}
        </ul>
        <div className="author">
          {data!==null && data.user.image!==null ? (<img className={`author-img`} src={data.user.image} alt={`foto do autor ou autora`}/>): null}
          <span className={`author-name`}>{data?.user.name}</span>
        </div>
        <div className="body-text">
          <h3 className="title">Descrição {viewMode} <strong>de {data?.title}</strong></h3>
          <p className="text">{data!==null && data.description}</p>
        </div>
        <CategoryButton onClick={() => router.push(`/page/category/${data?.categorie.name}/0`)}>{data?.categorie.name}</CategoryButton>
      </div>
      {show ? (<ul className={viewModes[viewMode]} style={{gridArea: 'manga-pages'}}>
        {data?.imagepaths.map((img, indice)=> (<li key={img.name}>
          <img src={`https://storage.cloud.google.com/xyz2-book-page-image-data/${img.name}`} alt={`página nº ${indice+1}`} />
        </li>))}
      </ul>) : null}
    </MangaViewer>) : null}
  </MangaViewerContext.Provider>);
};