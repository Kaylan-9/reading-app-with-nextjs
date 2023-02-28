import ContainerBookAdd from '@/components/sections/FormsAdd';
import Header from '@/components/sections/header/Header';
import MangaEdit from '@/components/sections/lists/MangasEdit';
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
  const userData = typeof idUser==='string' ? (await getUserBooks(idUser.replace(/@/, ''))) : null;
  return ({
    props: {
      userData
    }
  });
};

export default function User({userData}: IUserPageProps) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const { status } = useSession();

  useEffect(() => {
    if(userData===null) {
      handleModal({type: 'add', newModal: {message: 'usuário não existe!'}});
      router.push('/');
    }
  }, []);

  return (userData!==null ? (
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
          {name:'princípal'},
          {name:'favoritos', onClick: () => router.push(`${router.query.idUser}/favorites`)},
          {name:'adicionar', user: true},
          {name:'remover', user: true},
        ]}
      />
      {status==='authenticated' ? [(optionPicker===2) ? <ContainerBookAdd/> : null,] : null}
      <MangaEdit books={userData.book} _delete={optionPicker===3}/>
    </main>
  </>) :
  null);
}

