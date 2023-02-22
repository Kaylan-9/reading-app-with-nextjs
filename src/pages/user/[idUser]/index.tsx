import ContainerBookAdd from '@/components/sections/ContainerAdd';
import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import MangaEdit from '@/components/sections/lists/MangasEdit';
import Container from '@/components/ultis/Container';
import { ModalContext } from '@/contexts/ModalContext';
import { getUserBooks } from '@/lib/db/users';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { IUserPageProps } from '@/types/pages/user/IUserPageProps';
import UserProfile from '@/components/page/user/UserProfile';

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  let { idUser } = query;  
  const userExist = typeof idUser==='string';
  const userData = typeof idUser==='string' ? (await getUserBooks(idUser.replace(/@/, ''))) : null;
  return ({
    props: {
      userExist,
      userData
    }
  });
};

export default function User({userData, userExist}: IUserPageProps) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(!userExist) {
      handleModal({type: 'add', newModal: {message: '💣 usuário não existe!'}});
      router.push('/');
    }
    console.log(userData)
  }, [session]);

  return (userExist && userData!==null ? (
  <>
    <Head>
      {<title>{userData?.name}</title>}
    </Head>
    <Header/>
    <main>
      <UserProfile 
        userData={userData}
        selection={{
          condi: optionPicker,
          func: (indice) => setOptionPicker(indice)
        }} 
        options={[
          {name:'mangas', user: true},
          {name:'favoritos', onClick: () => router.push(`${router.query.idUser}/favorites`)},
          {name:'adicionar', user: true},
          {name:'remover', user: true},
        ]}
      />
      <Container>
        {(optionPicker===0 || !session?.user) ? <Mangas books={userData.book}/> : null}
        {status==='authenticated' ? [
          (optionPicker===2) ? <ContainerBookAdd/> : null,
          (optionPicker===3) ? <MangaEdit/> : null
        ] : null}
      </Container>
    </main>
  </>) :
  null);
}

