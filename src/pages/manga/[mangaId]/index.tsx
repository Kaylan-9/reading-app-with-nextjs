import Header from '@/components/Header';
import { Books, getBook, Images } from '@/lib/db';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState, useRef, useEffect, ReactNode, MouseEventHandler } from "react";
import { AiOutlineRead } from 'react-icons/ai';

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=50'
  )
  let { mangaId } = context.query;
  return {props: {
    bookData: typeof mangaId==="string" ? await getBook(Number(mangaId)) : null
  }};
}

const Presentation = styled.div`
  width: 100%;
  min-height: 350px;
  top: 20px;
  padding: 50px;
  display: grid;
  gap: 50px;
  grid-template-rows: min-content min-content !important;
  grid-template-columns: min-content auto !important;
  grid-template-areas: 
    'mangaoptions mangatitle mangacategory'
    'presentationimage mangadescription mangadescription';
  .presentationimage {
    border-radius: 15px;
    grid-area: presentationimage;
  }
  .title {grid-area: mangatitle}
  .category {grid-area: mangacategory}
  .description {
    font-family: 'Roboto', sans-serif !important;
    font-size: 20px;
    grid-area: mangadescription
  }
`;

const MangaContentSt = styled.div`
  background-color: black;
  .imagelist {
    box-sizing: border-box;
    padding: 50px;
    max-width: 1280px;
    width: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin: 0 auto;
    & > li > img {
      border-radius: 10px;
    }
  }
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

  return <>
    <Viewer 
      bookData={bookData} 
      viewContent={viewContent}
      setViewContent={setViewContent}
    />
    <Header/>
    <MangaContentSt>
      {((bookData ?? false)!=false) ? (<>
        <Presentation>
          <Image 
            className='presentationimage'
            alt={`${bookData?.imagepaths[0].name}-0`}
            src={`/images/${bookData?.path}/${bookData?.imagepaths[0].name}.${bookData?.imagepaths[0].type}`}
            width={300}
            height={405}
            quality={50}
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
        <ul className='imagelist'>{bookData?.imagepaths.map((img: Images, indice: number) => {
          if(indice > 0 && indice < 6)
            return (<li>
              <Image 
                key={img.name+img.id} 
                alt={`${img.name}-${indice}`}
                src={`/images/${bookData.path}/${img.name}.${img.type}`}
                width={200}
                height={270}
                quality={25}
              />
            </li>);
        })}</ul>
      </>) :
        null      
      }
    </MangaContentSt>
  </>
}