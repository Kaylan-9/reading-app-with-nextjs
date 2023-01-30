import Header from '@/components/sections/Header';
import Mangas from '@/components/sections/lists/Mangas';
import { ModalContext } from '@/contexts/ModalContext';
import { Books } from '@/lib/db/books';
import { getUserBooks, Users } from '@/lib/db/users';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=50'
  )

  let { idUser } = context.query;  
  const userExist = typeof idUser==='string';
  const userData = typeof idUser==='string' ? (await getUserBooks(Number(idUser.replace(/@/, '')))) : [];
  
  return ({
    props: {
      userExist,
      userData,
    }
  });
};

interface IUser {
  userData: Users & {book: Books[]};
  userExist: boolean;
};

const UserSt = styled.div`

`;

export default function User({userData, userExist}: IUser) {
  const router = useRouter();
  const {handleModal} = useContext(ModalContext);
  useEffect(() => {
    console.log(userData);
    if(!userExist) {
      handleModal({type: 'add', newModal: {message: '💣 usuário não existe!'}});
      router.push('/');
    }
    console.log(userData.book)
  }, []);

  return (<> 
    <Head>
      <title>{userData?.name}</title>
    </Head>
    <Header/>
    {
    (userExist ? (<UserSt>
      <Mangas title={`Mangás ${userData.name}`} books={userData.book}/>
    </UserSt>) :
    null)
    }
  </>);
}

