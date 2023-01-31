import ContainerBookAdd from '@/components/sections/ContainerAdd';
import Header from '@/components/sections/Header';
import Mangas from '@/components/sections/lists/Mangas';
import MangaEdit from '@/components/sections/lists/MangasEdit';
import Container from '@/components/ultis/Container';
import OptionsMenu from '@/components/ultis/OptionsMenu';
import { ModalContext } from '@/contexts/ModalContext';
import { Books } from '@/lib/db/books';
import { getUserBooks, Users } from '@/lib/db/users';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  let { idUser } = context.query;  
  const userExist = typeof idUser==='string';
  const userData = typeof idUser==='string' ? (await getUserBooks(idUser.replace(/@/, ''))) : null;
  const loggedInUser = session?.user?.email===userData?.email;

  return ({
    props: {
      userExist,
      userData,
      loggedInUser,
    }
  });
};

interface IUser {
  userData: (Users & {book: Books[]}) | null;
  userExist: boolean;
  loggedInUser: boolean;
};

const UserSt = styled.div`

`;

export default function User({userData, userExist, loggedInUser}: IUser) {
  const router = useRouter();
  const [optionPicker, setOptionPicker] = useState<number>(0);
  const {handleModal} = useContext(ModalContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(!userExist) {
      handleModal({type: 'add', newModal: {message: '💣 usuário não existe!'}});
      router.push('/');
    }
    console.log(userData);
  }, [session]);

  return (userExist && userData!==null ? (
  <>
    <Head>
      {<title>{userData?.name}</title>}
    </Head>
    <Header/>
    <UserSt>
      {loggedInUser ? (<OptionsMenu 
        selection={{
          condi: optionPicker,
          func: (indice) => setOptionPicker(indice)
        }} 
        options={[
          {name:'mangas', onClick(){}},
          {name:'adicionar', onClick(){}},
          {name:'remover', onClick(){}},
        ]}
      />) : null}
      <Container>
        {(optionPicker===0 || !loggedInUser) ? <Mangas title={`Mangás ${userData?.name}`} books={userData?.book}/> : null}
        {status==='authenticated' ?
          [
            (optionPicker===1) ? <ContainerBookAdd/> : null,
            (optionPicker===2) ? <MangaEdit/> : null
          ] :
          null
        }
      </Container>

    </UserSt>
  </>) :
  null);
}

