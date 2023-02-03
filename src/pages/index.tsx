import { BookUser, countPages, getAllBooks } from "@/lib/db/books";
import { getProfileData } from "@/lib/db/users";
import { GetStaticProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { ModalContext } from "@/contexts/ModalContext";
import { AboutText } from "@/components/sections/AboutText";
import { useSession } from "next-auth/react";
import { BiSearch } from "react-icons/bi";
import { Profiles } from "@/components/sections/lists/Profiles";
import Select from "@/components/ultis/Select";
import { useRouter } from "next/router";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import StPageButton from "@/components/sections/header/StPageButton";
import { css } from "@emotion/css";


export const getStaticProps: GetStaticProps = async () => {
  const books = await getAllBooks();
  const profiles = await getProfileData();
  const nOfPages = await countPages();
  return {
    props: {
      books,
      nOfPages,
      profiles
    }, 
    revalidate: 20
  }
}

export default ({profiles, books, nOfPages, pagination}: IHomePageProps) => {
  const { handleModal } = useContext(ModalContext);
  const [ searchContent,  setSearchContent ] = useState<BookUser[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status==='unauthenticated') 
      handleModal({type: 'add', newModal: {id: 0, message: (<AboutText/>)}});
  }, [session]);

  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <Header>
      <div className='search'>
        <div className="inputicon">
          <BiSearch onClick={async () => {
            const dataToDoSearch = JSON.stringify({
              title: searchInput.current?.value==="" ? false : searchInput.current?.value,
              category: categorySearchPicker.current?.value==="" ? false : categorySearchPicker.current?.value
            });
            const resultResearch = await fetch('/api/book/search', {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: dataToDoSearch
            });
            const dataResearch = await resultResearch.json();
            setSearchContent(dataResearch.research as BookUser[]);
          }}/>
          <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
        </div>
        <Select ref={categorySearchPicker}/>
      </div>
      <StPageButton className={css`
        grid-area: allpagesbtn;
      `} onClick={() => {
        router.push('/page/0');
      }}>
        todos os mangás
      </StPageButton>
    </Header>
    <main>
      <Profiles data={profiles}/>
      <Mangas title='Mangás' books={(!searchContent ? books : searchContent)}/>
    </main>
  </>)
};
