import Header from '@/components/sections/header/Header';
import Mangas from '@/components/sections/lists/Mangas';
import Container from '@/components/ultis/Container';
import OptionsMenu from '@/components/ultis/OptionsMenu';
import { ModalContext } from '@/contexts/ModalContext';
import { getUserFavoriteBooks } from '@/lib/db/users';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { IUserPageProps } from '@/types/pages/IUserPageProps';
import { Books } from '@/lib/db/books';

export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
  let { idUser } = query;  
  const userExist = typeof idUser==='string';
  const userData = typeof idUser==='string' ? (await getUserFavoriteBooks(idUser.replace(/@/, ''))) : null;
  return ({
    props: {
      userExist,
      userData
    }
  });
};

const UserSt = styled.div`

`;

export default function User({userData, userExist}: IUserPageProps & {userData: any}) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(!userExist) {
      handleModal({type: 'add', newModal: {message: '💣 usuário não existe!'}});
      router.push('/');
    }
  }, [session]);

  return (userExist && userData!==null ? (
  <>
    <Head>
      {<title>{userData?.name}</title>}
    </Head>
    <Header/>
    <UserSt>
      <OptionsMenu 
        selection={{
          condi: optionPicker,
          func(indice){ setOptionPicker(indice)}
        }} 
        options={[
          {name:'favoritos'},
          {name:'ir para o perfil', onClick(){
            router.push(`/user/${router.query.idUser}`)
          }},
        ]}
      />
      <Container>
        <Mangas 
          title={`Favoritos de ${userData?.name}`} 
          books={userData?.favorites?.map((favorite: any)=> favorite?.book)}
        /> : 
      </Container>
    </UserSt>
  </>) :
  null);
}