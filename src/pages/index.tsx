import { getRandomBooks } from "@/lib/db/books";
import { GetServerSideProps } from "next"
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import { useRef, useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { BiSearch } from "react-icons/bi";
import { Categories } from "@/components/sections/header/Categories";
import Select from "@/components/ultis/Select";
import { IHomePageProps } from "@/types/pages/IHomePageProps";
import { IBookUserCategories } from "@/types/data/Books";
import { getAllCategory } from "@/lib/db/categories";
import { ModalContext } from "@/contexts/ModalContext";
import { css } from "@emotion/css";

export const getStaticProps: GetServerSideProps = async () => {
  const books = await getRandomBooks();
  const categories = await getAllCategory();
  return {
    props: {
      books,
      categories
    }
  }
};


export default ({categories, books}: IHomePageProps) => {
  const [ searchContent,  setSearchContent ] = useState<IBookUserCategories[] | false>(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const categorySearchPicker = useRef<HTMLInputElement>(null);
  const { handleModal } = useContext(ModalContext);

  useEffect(() => {
    handleModal({type: 'add', newModal: {message: (<div className={css`
    max-width: 40em;
    display: flex;
    flex-flow: column wrap;
    gap: 1em;
    padding: 2em 0;
    h3 {
      margin-bottom: 1em; 
    }
    p {
      line-height: 1.5em;
      text-align: justify;
    }
    `}>
    <h3>Termos de serviço</h3>
    <p>Segundo "A Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018" é obrigatório que os usuários tenham conhecimento da finalidade, assim como dos dados armazenados em <strong>sites Web</strong>. </p>
    <p>Esta página mantém somente dados necessários a aplicação, e que foram disponibilizados, por meio do uso consciente do uso desta mesma. </p>
    <p>Os dados presentes somente nela dizem respeito a identificação de seus elementos e usuários, faça login, assim como sessões de acesso. Ou seja, ela apresenta dados pessoais de seus usuários, como nome, senha, e-mail, fotos, marcações de favorito, considere-se também as imagens dos "posts" realizados, título, descrição, usuário pertencente e categoria.</p>
  </div>)}});
  }, []);


  return (<>
    <Head>
      <title>Reading App</title>
    </Head>
    <Header>
      {/* <div className='search'>
        <div className="input-icon">
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
            setSearchContent(dataResearch.research);
          }}/>
          <input ref={searchInput} type="text" name="" id="" placeholder='pesquisar por nome'/>
        </div>
        <Select ref={categorySearchPicker}/>
      </div> */}
      <Categories data={categories}/>
    </Header>
    <main>
      <Mangas title='Mangás' link={`/page/0`} linkname={`ver todos`} books={books}/>
    </main>
  </>)
};
