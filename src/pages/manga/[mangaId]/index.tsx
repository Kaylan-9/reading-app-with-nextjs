import Header from '@/components/sections/header/Header';
import { Message } from '@/components/ultis/Message';
import { ModalContext } from '@/contexts/ModalContext';
import { getBook } from '@/lib/db/books';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import { MouseEvent, useContext } from 'react';
import { useState, useRef, useEffect, useCallback } from "react";
import { AiOutlineRead } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { isFavorite } from '@/lib/db/favorite';
import { IBookUser } from '@/types/data/Books';
import CategoryButton from '@/styles/components/CategoryButton';
import { useRouter } from 'next/router';

interface MangaPageProps { 
  bookData?: any;
  isfavorite?: boolean; 
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=50'
  )
  let props: MangaPageProps = {};

  let { mangaId } = context.query;
  if(typeof mangaId==="string") {
    props.bookData = await getBook(Number(mangaId.replace('@', '')));
    const session: any = await getServerSession<any>(context.req, context.res, authOptions);
    if(session.user!==undefined) {
      const userId = session.user.id;
      if(userId) props.isfavorite = await isFavorite(userId, Number(mangaId.replace('@', '')));
    }
  }
  return { props };
}

const Presentation = styled.div`
  width: 100%;
  min-height: 350px;
  top: 20px;
  padding: 50px 150px;
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
    cursor: pointer;
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


const OptionsSt = styled.ul`
  display: flex;
  justify-content: space-between;
  grid-area: mangaoptions;
  flex-flow: row wrap;
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

const ViewerSt = styled.ul`
  position: fixed;
  z-index: 1000;
  background-color: #000000c5;
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

const Viewer = ({bookData, viewContent, setViewContent}: {bookData: IBookUser, viewContent: boolean, setViewContent: any}) => {
  const { handleModal } = useContext(ModalContext);
  const [pagePosition, setPagePosition] = useState<number>(0);
  const numberPages = bookData.imagepaths.length-1;
  const imagesEle = useRef<HTMLUListElement>(null);
  const handleScroll = useCallback(async (e: WheelEvent)=> {
    const {deltaY} = e;    
    let scrollLimit = 4;
    if(viewContent && imagesEle.current!==null && scrollLimit===4) {
      let lockScroll = new Promise(async (resolve)=> resolve(''));
      for(let i=0;i<=4;i++) {
        let scroll = (100/(i+1));        
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
          }, (200+(i**2)));      
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

export default function Manga({bookData, isfavorite}: MangaPageProps) {
  const router= useRouter();
  const [ viewContent, setViewContent ] = useState<boolean>(false);
  const { data: session, status }: any = useSession<any>();
  const [ like, setLike ] = useState<boolean | null | undefined>(isfavorite);
  type TOption = {
    name?: string;
    Icon: React.ReactNode
    onClick: () => void
  }
  let options: TOption[] = [
    {name: "ler", Icon: <AiOutlineRead/>, onClick: () => setViewContent(true),}
  ];
  
  if(like!==null && like!==undefined) {
    const Icon = (like ? <IoHeart/> : <IoHeartOutline/>);
    options.push({Icon, onClick: async () => {
      if(status === 'authenticated' && session.user.id!==undefined) {
        setLike(oldLike => !oldLike);
        await fetch('/api/favorite/changemark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bookId: bookData.id,
            userId: session.user.id,
            isfavorite
          })
        });
      }
    },});
  }

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
          <h2 className='title'>{bookData.title}</h2>
          <CategoryButton onClick={() => router.push(`/page/category/${bookData.categorie.name}/0`)} className='category'>
            {bookData.categorie.name}
          </CategoryButton>
          <p className='description'>{bookData?.description}</p>
          <OptionsSt>
            {options.map((option, indice) => {
              return (<li 
                key={(option?.name ?? 'option')+indice+'0'} 
                onClick={option.onClick}
              >
                <span>{option?.name}</span>
                {option.Icon}  
              </li>);
            })}
          </OptionsSt>
        </Presentation>
      </>) :
        null      
      }
    </MangaContentSt>
  </>
}