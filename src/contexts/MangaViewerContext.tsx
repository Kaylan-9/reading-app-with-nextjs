import { IPropsMangaViewer } from "@/types/contexts/MangaViewerContext/components/IPropsMangaViewer";
import { IMangaViewerReducerAction } from "@/types/contexts/MangaViewerContext/reducers/MangaViewerReducerAction";
import { IMangaViewerReducerState } from "@/types/contexts/MangaViewerContext/reducers/MangaViewerReducerState";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import styled from "@emotion/styled";
import { createContext, ReactNode, Reducer, useEffect, useReducer, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IBookUserCategories } from "@/types/data/Books";
import { useSession } from "next-auth/react"

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
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: min-content auto;
  grid-template-areas: 
    'btn-close .'
    'manga-img manga-container'
    '. .'
  ;
  row-gap: 2em;
  column-gap: 5em;
  backdrop-filter: blur(2px); 
  background-color: rgba(0, 0, 0, 0.411);
  filter: blur(0px);
  position: fixed;
  padding: 5em calc(((100vw - 1920px) / 2) + 4em);
  > img {
    width: 18.75em;
    border-radius: 1em;
    grid-area: manga-img;
  }
  > .manga-container {
    grid-area: manga-container;
    background-color: rgb(var(--background));
    padding: 2em;
    border-radius: 1em;
    > .author {
      margin-bottom: 1em;
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
      margin-bottom: 25px;
      padding: 15px 10px;
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

export const MangaViewerContext = createContext<IPropsMangaViewer>(initialValueMangaViewer);

export default function MangaViewerProvider({children}: {children: ReactNode}) {
  const [mangaViewer, handleMangaViewer] = useReducer<Reducer<IMangaViewerReducerState, IMangaViewerReducerAction>>(mangaViewerReducer, initialValueMangaViewerReducer);
  const [data, setData] = useState<IBookUserCategories | null>(null);
  const [marked, setMarked] = useState<boolean>(false);
  const {data: session}: {data: any} = useSession();

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
    console.log(session);
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
        <div className="author">
          {data!==null && data.user.image!==null && (<>
            <img className={`author-img`} src={data.user.image} alt={`foto do autor ou autora`}/>
            <span className={`author-name`}>{data.user.name}</span>
          </>)}
        </div>
        <ul className="btns">
          <li>
            <button>
              {marked ? (<IoHeart/>) : (<IoHeartOutline/>)}
            </button>
          </li>
        </ul>
        <div className="body-text">
          <h3 className="title">Descrição <strong>de {data?.title}</strong></h3>
          <p className="text">{data!==null && data.description}</p>
        </div>
      </div>
    </MangaViewer>) : null}
  </MangaViewerContext.Provider>);
};