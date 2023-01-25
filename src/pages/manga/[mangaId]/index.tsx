import Header from '@/components/Header';
import { Books, getBook, Images } from '@/lib/db';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState, useRef, useEffect, ReactNode } from "react";
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

const Presentation = styled.div<{image: string}>`
  width: 100%;
  min-height: 350px;
  top: 20px;
  padding: 50px;
  display: grid;
  column-gap: 50px;
  row-gap: 10px;
  grid-template-rows: min-content min-content !important;
  grid-template-columns: min-content auto !important;
  grid-template-areas: 
    'mangaoptions mangatitle'
    'mangaoptions mangacategory'
    'presentationimage mangadescription';
  background-image: linear-gradient(to right, black 25%, #00000076 100%), url(${({image}) => image});
  background-size: cover;
  > * {
    font-family: 'Roboto', sans-serif !important;
  }
  .presentationimage {
    border-radius: 15px;
    grid-area: presentationimage;
    width: 400px;
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
  background-color: black;
  color: white;
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

const ViewerSt = styled.div`
  position: fixed;
  background-color: #000000ac;
  min-height: 100vh;
  min-width: 100vw;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: calc(100vh - 100px);
  }
`;

const Viewer = ({bookData, viewContent, setViewContent}: {bookData: Books | null, viewContent: boolean, setViewContent: any}) => {
  const [pagePosition, setPagePosition] = useState<number>(0);
  const imageEle = useRef<HTMLImageElement>(null);

  return (viewContent ? (<ViewerSt onClick={e => {
    if(viewContent) {
      type imagePositionsType = undefined | null | {
        left: number | null,
        right: number | null
      };
      const imagePositions: imagePositionsType = imageEle.current?.getBoundingClientRect();
      if(imagePositions!==null) {
        let { clientX } = e;
        if(typeof imagePositions?.left==='number' && typeof imagePositions?.right==='number')
          if(clientX < (imagePositions.left) || clientX > (imagePositions.right))
            setViewContent(false);
      }
    }
  }}>
    <img 
      ref={imageEle}
      onClick={(e: any) => setPagePosition((currentPagePosition: number) => { 
        const numberPages = bookData?.imagepaths.length-1;
        return (e.clientX > (window.innerWidth/2) ?
          (currentPagePosition === numberPages ? 0 : currentPagePosition+1) : 
          (currentPagePosition === 0 ? numberPages : currentPagePosition-1)
        );
      })}
      alt={`${bookData?.imagepaths[pagePosition].name}-${pagePosition}`}
      src={`/images/${bookData?.path}/${bookData?.imagepaths[pagePosition].name}.${bookData?.imagepaths[pagePosition].type}`}
    />
  </ViewerSt>) : 
  null);
}

export default function Manga({bookData}: {bookData: Books | null}) {
  const [viewContent, setViewContent] = useState<boolean>(false);
  const [viewPosition, setViewPosition] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      const numberPages = bookData?.imagepaths.length-1;
      setViewPosition(currentViewPosition => {
        return ((numberPages<=6 && currentViewPosition<numberPages) ? 
          (currentViewPosition+1) : ((currentViewPosition<=6 && numberPages>6) ? (currentViewPosition+1) : 0));
      });
    }, 5000);
  }, [viewPosition, setViewPosition]);

  return <>
    <Head>
      <title>{bookData?.title}</title>
    </Head>
    <Viewer 
      bookData={bookData} 
      viewContent={viewContent}
      setViewContent={setViewContent}
    />
    <Header/>
    <MangaContentSt>
      {((bookData ?? false)!=false) ? (<>
        <Presentation image={`https://storage.cloud.google.com/xyz2-book-page-image-data/${bookData?.imagepaths[viewPosition].name}`}>
          <img
            className='presentationimage'
            alt={`${bookData?.imagepaths[0].name}-0`}
            src={`https://storage.cloud.google.com/xyz2-book-page-image-data/${bookData?.imagepaths[0].name}`}
          />
          <h2 className='title'>{bookData?.title}</h2>
          <h3 className='category'>{bookData?.categorie}</h3>
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