import Header from '@/components/Header';
import { Books, getBook, Images } from '@/lib/db';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

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
    'mangatitle mangatitle'
    'presentationimage mangadescription';
  .presentationimage {
    border-radius: 15px;
    grid-area: presentationimage;
  }
  .title {grid-area: mangatitle}
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

export default function Manga({bookData}: {bookData: Books | null}) {
  return <>
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
          <p className='description'>{bookData?.description}</p>
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