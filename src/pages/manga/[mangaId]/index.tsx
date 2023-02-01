import Header from '@/components/sections/Header';
import { Message } from '@/components/ultis/Message';
import { ModalContext } from '@/contexts/ModalContext';
import { Books, getBook } from '@/lib/db/books';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { MouseEvent, useContext } from 'react';
import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { AiOutlineRead } from 'react-icons/ai';

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=50'
  )
  let { mangaId } = context.query;
  return {props: {
    bookData: typeof mangaId==="string" ? 
      await getBook(Number(mangaId.replace('@', ''))) :
      null
  }};
}

const Presentation = styled.div`
  width: 100%;
  min-height: 350px;
  top: 20px;
  padding: 50px;
  display: grid;
  gap: 25px;
  grid-template-rows: min-content min-content !important;
  grid-template-columns: min-content auto !important;
  grid-template-areas: 
    'mangatitle mangatitle'
    'mangacategory mangadescription'
    'presentationimage mangadescription'
    'mangaoptions .';
  background-size: cover;
  > * {
    font-family: 'Roboto', sans-serif !important;
  }
  .presentationimage {
    border-radius: 15px;
    grid-area: presentationimage;
    width: 250px;
  }
  .title {grid-area: mangatitle}
  .category {grid-area: mangacategory}
  .description {
    font-size: 20px;
    text-indent: 25px;
    line-height: 45px;
    grid-area: mangadescription
  }
`;

const MangaContentSt = styled.div`
  color: white;
  max-width: var(--max-width);
  width: 100%;
  margin: 0 auto;
`;

type OptionsType = {
  options: {
    name: string,
    Icon: ReactNode,
    onClick: () => void
  }[]
}

const OptionsSt = styled.ul`
  grid-area: mangaoptions;
  & > li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    & > span {
      font-family: 'Roboto', sans-serif !important;
      font-size: 20px;
    }
    & > svg {
      font-size: 25px;
    }
  }
`;

const Options = ({options}: OptionsType) => {
  return(<OptionsSt>
    {options.map((option, indice) => {
      return (<li 
        key={option.name+indice+'0'} 
        onClick={option.onClick}
      >
        <span>{option.name}</span>
        {option.Icon}  
      </li>);
    })}
  </OptionsSt>);
}

const ViewerSt = styled.ul`
  position: fixed;
  z-index: 1000;
  background-color: #1f1f1fc6;
  min-height: 100vh;
  min-width: 100vw;
  padding-top: 50px;
  transition: top 500ms;
  & > li > img {
    position: relative;
    max-height: calc(100vh - 100px);
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Viewer = ({bookData, viewContent, setViewContent}: {bookData: Books | null, viewContent: boolean, setViewContent: any}) => {
  const { handleModal } = useContext(ModalContext);
  const [pagePosition, setPagePosition] = useState<number>(0);
  const numberPages = bookData?.imagepaths.length-1;
  const imagesEle = useRef<HTMLUListElement>(null);
  const handleScroll = useCallback(async (e: WheelEvent)=> {
    const {deltaY} = e;    
    let scrollLimit = 4;
    if(viewContent && imagesEle.current!==null && scrollLimit===4) {
      let lockScroll = new Promise(async (resolve)=> resolve(''));
      for(let i=0;i<=4;i++) {
        let scroll = (100/((i+1)*1.1));        
        scrollLimit--;
        lockScroll = new Promise((resolve) => {
          setTimeout(() => {
            if(imagesEle.current!==null) {
              let top: unknown = Number(imagesEle.current.style.top.replace(/px/, ''));
              if(typeof top==='number') {  
                let {height} = imagesEle.current?.getClientRects()[0];
                const allImages = imagesEle.current?.querySelectorAll('img');
                height = height - allImages[allImages.length-1].getClientRects()[0].height;
                if((top*-1)>height) {
                  handleModal({type: 'add', newModal: {message: (<Message text={`🎉😋 Parabéns Mangá (${bookData?.title}) terminado 📚📕📖`}/>)}})
                }
                if(top>0 || (top*-1)>height) setViewContent(false);
                const newTop = (deltaY>0 ? `${top-scroll}px` : `${top+scroll}px`);
                imagesEle.current.style.top = newTop;
                scrollLimit++;
                resolve(false);
              }
            }
          }, (200+(i**2*50)));      
        });
        await lockScroll;
      }
    }
    
  }, [imagesEle]);
  const handleClick = useCallback((e: MouseEvent<HTMLUListElement>) => {
    if(viewContent && imagesEle.current!==null) {
      type imagePositionsType = undefined | null | {
        left: number,
        right: number
      };
      const imgObj = imagesEle.current.querySelectorAll('img');
      const imgPositions: imagePositionsType = imgObj[imgObj.length-1].getBoundingClientRect();
      const {clientX} = e;
      if(
        typeof imgPositions?.left==='number' && 
        typeof imgPositions.right==='number' && 
        (clientX < (imgPositions.left) || clientX > (imgPositions.right))
      )
        setViewContent(false);
    }
  }, [viewContent]);

  useEffect(() => {
    imagesEle.current?.removeEventListener('wheel', handleScroll);
    imagesEle.current?.addEventListener('wheel', handleScroll);
  }, []);

  return (<ViewerSt ref={imagesEle} onClick={handleClick}>
    {bookData?.imagepaths.map((image: {name: string}, indice: number) => {
      return (indice>=pagePosition || indice<=pagePosition+10 || (numberPages<10 && indice<=numberPages) ?
        (<li key={image.name}>
        <img 
          onClick={(e: MouseEvent) => setPagePosition((currentPagePosition: number) => { 
            return (e.clientX > (window.innerWidth/2) ?
              (currentPagePosition === numberPages ? 0 : currentPagePosition+1) : 
              (currentPagePosition === 0 ? numberPages : currentPagePosition-1)
            );
          })}
          alt={`${bookData?.imagepaths[pagePosition].name}-${pagePosition}`}
          src={`https://storage.cloud.google.com/xyz2-book-page-image-data/${image?.name}`}
        />
      </li>) : null);
    })}
  </ViewerSt>);
}

export default function Manga({bookData}: {bookData: Books & {categorie: {name: string}} | null}) {
  const [viewContent, setViewContent] = useState<boolean>(false);

  return <>
    <Head>
      <title>{bookData?.title}</title>
    </Head>
    {viewContent ? <Viewer
      viewContent={viewContent} 
      bookData={bookData} 
      setViewContent={setViewContent}
    />: null }
    <Header/>
    <MangaContentSt>
      {((bookData ?? false)!=false) ? (<>
        <Presentation>
          <img
            className='presentationimage'
            alt={`${bookData?.imagepaths[0].name}-0`}
            src={`https://storage.cloud.google.com/xyz2-book-page-image-data/${bookData?.imagepaths[0].name}`}
            onClick={()=>setViewContent(true)}
          />
          <h2 className='title'>{bookData?.title}</h2>
          <h3 className='category'>{bookData?.categorie?.name}</h3>
          <p className='description'>{bookData?.description}</p>
          <Options options={[
            {name: "read", Icon: <AiOutlineRead/>, onClick() {
              setViewContent(true);
            },}
          ]}/>
        </Presentation>
      </>) :
        null      
      }
    </MangaContentSt>
  </>
}