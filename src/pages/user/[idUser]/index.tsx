import ContainerBookAdd from '@/components/FormsAdd';
import Header from '@/components/Header';
import MangaEdit from '@/components/MangasEdit';
import { ModalContext } from '@/contexts/ModalContext';
import { getUserBooks } from '@/lib/db/users';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { IUserPageProps } from '@/types/pages/user/IUserPageProps';
import UserProfile from '@/components/UserProfile';
import Main from '@/components/Main';
import { getAllCategory } from '@/lib/db/categories';
import ReadingAside from '@/components/ReadingAside';
import { CategoriesContext } from '@/contexts/CategoriesContext';

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  let { idUser } = query;  
  const userData = typeof idUser==='string' ? (await getUserBooks(idUser.replace(/@/, ''))) : null;
  const categories= await getAllCategory();
  return ({
    props: {
      userData,
      categories
    }
  });
};

export default function User({userData, categories}: IUserPageProps) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const {status} = useSession();
  const {setView} = useContext(CategoriesContext);

  useEffect(() => {
    setView(false);
    if(userData===null) {
      handleModal({type: 'add', newModal: {message: 'usuário não existe!'}});
      router.push('/');
    }
  }, []);

  return (userData!==null ? (
  <>
    <Head>
      <title>Perfil de {userData?.name}</title>
      <meta name={`author`} content={userData?.name ?? 'desconhecido'}/>
      <meta name={`description`} content={`Página de usuário, obtenha dados do perfil como conteúdos postados e acesso a outras informações.`}/>
    </Head>
    <Header/>
    <Main>
      <ReadingAside categories={categories}/>
      <UserProfile 
        userData={userData}
        selection={{
          condi: optionPicker,
          func: (indice) => setOptionPicker(indice)
        }} 
        options={[
          {name:'princípal'},
          {name:'favoritos', onClick: () => router.push(`${router.query.idUser}/favorites`)},
          {name:'adicionar', user: true},
          {name:'remover', user: true},
        ]}
      />
      {status==='authenticated' ? [(optionPicker===2) ? <ContainerBookAdd/> : null,] : null}
      <MangaEdit books={userData.book} _delete={optionPicker===3}/>
    </Main>
  </>) :
  null);
}

