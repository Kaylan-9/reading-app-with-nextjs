import Header from '@/components/Header';
import Mangas from '@/components/Mangas';
import { ModalContext } from '@/contexts/ModalContext';
import { getUserFavoriteBooks } from '@/lib/db/users';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { IUserPageProps } from '@/types/pages/user/IUserPageProps';
import UserProfile from '@/components/UserProfile';
import { css } from '@emotion/css';
import { NavMain } from '@/styles/NavMain';
import AdsByGoogle from '@/components/AdsByGoogle';

export const  getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  let { idUser } = query;  
  const userExist = typeof idUser==='string';
  const userData = typeof idUser==='string' ? (await getUserFavoriteBooks(idUser.replace(/@/, ''))) : null;
  return ({
    props: {
      userExist,
      userData,
    }
  });
};

export default function User({userData}: IUserPageProps & {userData: any}) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const { data: session } = useSession();

  useEffect(() => {
    if(userData===null) {
      handleModal({type: 'add', newModal: {message: '💣 usuário não existe!'}});
      router.push('/');
    }
  }, [session]);

  return (userData!==null ? (
  <>
    <Head>
      {<title>{userData?.name}</title>}
    </Head>
    <NavMain>
      <Header/>
    </NavMain>
    <main>
      <UserProfile 
        userData={userData}
        selection={{
          condi: optionPicker,
          func(indice){setOptionPicker(indice)}
        }} 
        options={[
          {name:'favoritos'},
          {name:'ir para o perfil', onClick(){
            router.push(`/user/${router.query.idUser}`)
          }},
        ]}
      />
      <Mangas books={userData?.favorites?.map((favorite: any)=> favorite.book)}/>
    </main>
  </>) :
  null);
}
