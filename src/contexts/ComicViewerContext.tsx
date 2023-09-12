import IPropsComicViewer from "@/types/contexts/ComicViewerContext/components/IPropsComicViewer";
import IComicViewerReducerAction from "@/types/contexts/ComicViewerContext/reducers/ComicViewerReducerAction";
import IComicViewerReducerState from "@/types/contexts/ComicViewerContext/reducers/ComicViewerReducerState";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { HiViewGrid } from 'react-icons/hi';
import { AiFillRead } from 'react-icons/ai';
import styled from "@emotion/styled";
import { createContext, ReactNode, Reducer, useCallback, useEffect, useReducer, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IComicUserCategories } from "@/types/data/Comics";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { css } from "@emotion/css";
import requestParameters from "@/utils/requestParameters";
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/react';
import { Image } from "@/types/data/Images";
import { AnimatePresence } from "framer-motion";
import Button, { ViewerOption } from "@/styles/Button";

const initialValueComicViewerReducer: IComicViewerReducerState = {
  id: null
};

export function comicViewerReducer(state: IComicViewerReducerState, action: IComicViewerReducerAction): IComicViewerReducerState {
  let { id }= state;
  if(action.type==='id' && action.id!==undefined) {
    id= action.id;
  }
  return {
    id
  };
};


const initialValueComicViewer = {
  comicViewer: initialValueComicViewerReducer,
  handleComicViewer: comicViewerReducer
};

export const ComicViewer= styled.div`
  z-index: 6;
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: 19em auto 56px;
  grid-template-areas: 
    'btn-close . .'
    'manga-img manga-container manga-tools'
    'manga-pages manga-pages manga-pages'
  ;
  row-gap: 1em;
  column-gap: 1em;
  backdrop-filter: blur(2px); 
  background-color: rgba(0, 0, 0, 0.637);
  filter: blur(0px);
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 1em calc(((100vw - (1920px)) / 2));
  @media(max-width: 800px) {
    background-color: var(--fourth-bg) !important;
    grid-template-rows: min-content min-content min-content auto;
    grid-template-columns: auto !important;
    row-gap: 0 !important;
    grid-template-areas: 
      'btn-close'
      'manga-container' 
      'manga-tools'
      'manga-pages'
    ;
    > img {
      display: none;
    }
    > .manga-container {
      margin-right: 0 !important;
      border-radius: 0 !important;
    }
    > .btns {
      display: flex;
      flex-flow: row wrap !important;
      padding-bottom: 2em !important;
    }
  }
  > img {
    border-radius: 1em;
    grid-area: manga-img;
    max-width: 18em;
    margin-left: 1em;
  }
  > .btns {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    gap: 2.5em;
    grid-area: manga-tools;
    > li {
      margin: 0 !important;
      > button {
        border: none;
        outline: none;
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: #8b33ff;
        > svg {
          font-size: 2em;
          > * {
            color: white;
          }
        }
      }
    }
  }
  > .manga-container {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    justify-content: flex-start;
    grid-area: manga-container;
    gap: 1em;
    background-color: var(--fourth-bg);
    padding: 2em;
    border-radius: 2em;
    margin-right: 1em;
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
    margin-left: 16px;
  }
`;

const viewModes = [
  css`  
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    > li > img {  
      width: 100%;
      max-width: 50em;
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
      @media(max-width: 800px){
        height: 25vw;
      }
    }
  `
]

export const ComicViewerContext = createContext<IPropsComicViewer>(initialValueComicViewer);

export default function ComicViewerProvider({children}: {children: ReactNode}) {
  const router= useRouter();
  const [comicViewer, handleComicViewer] = useReducer<Reducer<IComicViewerReducerState, IComicViewerReducerAction>>(comicViewerReducer, initialValueComicViewerReducer);
  const [data, setData] = useState<IComicUserCategories | null>(null);
  const [marked, setMarked] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<number>(0);
  const [cldImgs, setCldImgs] = useState<any>([]);
  const { data: session, status }: any = useSession();
  const changeMark= useCallback(async () => {
    setMarked(oldMarked=> !oldMarked);
    const res= await fetch(`/api/favorite/changemark`, {
      ...requestParameters.json,
      body: JSON.stringify({
        isfavorite: marked,
        userId: session.user.id, 
        bookId: comicViewer.id
      })
    });
  }, [session, comicViewer, marked]);
  
  useEffect(()=> {
    if(status==='authenticated' && typeof comicViewer.id==='number') (async () => {
      const request= await fetch(`/api/favorite/isfavorite`, {
        ...requestParameters.json,
        body: JSON.stringify({
          bookID: comicViewer.id,
          userID: session.user.id
        })
      });
      const response: any = await request.json();
      setMarked(response.data.marked);
    })();
  }, [comicViewer, status, session]);

  useEffect(() => {
    if(typeof comicViewer.id==='number') (async () => {
      const request= await fetch(`/api/book/data`, {
        ...requestParameters.json,
        body: JSON.stringify({id: comicViewer.id})
      });
      const response: any = await request.json();
      setCldImgs(response.book?.imagepaths.map((image: Image) => {
        const myImage= new CloudinaryImage(`mangas-${response.book.title}-${image.name}`, {cloudName: 'dxfae0yk7'});
        return myImage;
      }));
      setData(response.book);
    })();  
  }, [comicViewer, status, session]);

  return (<ComicViewerContext.Provider value={{comicViewer, handleComicViewer}}>
    {children}
    {comicViewer.id!==null ? (<ComicViewer>
      <AnimatePresence>
        {data!==null && cldImgs[0]!==undefined ? 
          (<AdvancedImage
            cldImg={cldImgs[0]}
            plugins={[lazyload(), placeholder({mode: 'pixelate'})]}
            alt={`capa do mangá`}
          />) : 
          null
        }
        <IoIosCloseCircle onClick={() => {
          handleComicViewer({type: 'id', id: null});
          setData(null);
        }}/>
    
        <div className="manga-container">
          <div className="author">
            {data!==null && data.user.image!==null ? (<img className={`author-img`} src={data.user.image} alt={`foto do autor ou autora`}/>): null}
            <span className={`author-name`}>{data?.user.name}</span>
          </div>
          <div className="body-text">
            <h3 className="title">Descrição <strong>de {data?.title}</strong></h3>
            <p className="text">{data!==null && data.description}</p>
          </div>
          <Button onClick={() => router.push(`/page/0/${data?.categorie.id}`)}>{data?.categorie.name}</Button>
        </div>
        {show && cldImgs[0]!==null ? (<ul className={viewModes[viewMode]} style={{gridArea: 'manga-pages'}}>
          {data?.imagepaths.map((img: {name: string}, indice: number)=> <li key={img.name}>
            <AdvancedImage cldImg={cldImgs[indice]} alt={`página nº ${indice+1}`} plugins={[lazyload(), placeholder({mode: 'pixelate'})]} />
          </li>)}
        </ul>) : null}

        <ul className="btns">
          {
            status==='authenticated' ?
              (<li><ViewerOption onClick={changeMark}>{marked ? (<IoHeart/>) : (<IoHeartOutline/>)}</ViewerOption></li>) :
            null
          }
          <li><ViewerOption onClick={() => setShow(oldShow=> !oldShow)}><AiFillRead/></ViewerOption></li>
          {show ? (<li><ViewerOption onClick={() => setViewMode(oldViewMode =>
              viewModes.length-1==oldViewMode ? 0 : oldViewMode+1
          )}><HiViewGrid/></ViewerOption></li>) : null}
        </ul>

      </AnimatePresence>
    </ComicViewer>) : null}
  </ComicViewerContext.Provider>);
};