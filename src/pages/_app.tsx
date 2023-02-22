import Footer from '@/components/Footer';
import ModalProvider from '@/contexts/ModalContext';
import { IMyAppProps } from '@/types/pages/IMyAppProps';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { getCsrfToken, getProviders, SessionProvider } from 'next-auth/react';
import { useCallback, useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import '../app/globals.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {props: {providers, csrfToken}}
}

export const StButtonBackToTop = styled.button`
  padding: 10px;
  border-radius: 100%;
  background-color: var(--foreground-primary);
  position: fixed;
  border: none;
  background-color: white;
  bottom: 50px;
  right: 50px;
`;

export function ButtonBackToTop() {
  const backToTheTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (<StButtonBackToTop onClick={backToTheTop}>
    <IoIosArrowUp/>
  </StButtonBackToTop>);
}

export default function MyApp({ Component, pageProps: {session, ...pageProps}}: IMyAppProps) {
  const [ screenHeight, setScreenHeight ] = useState<number>(0);
  const [ enoughPosition, setEnoughPosition ] = useState<boolean>(true);
  const handleScroll = useCallback(() => {
    setEnoughPosition((document.body.getClientRects()[0].y*-1)>(screenHeight/3));
    console.log((screenHeight/2)>(document.body.getClientRects()[0].y*-1))
  }, [screenHeight, setScreenHeight]);

  useEffect(() => {setScreenHeight(document.body.clientHeight);}, []);
  useEffect(() => {
    setEnoughPosition((document.body.getClientRects()[0].y*-1)>(screenHeight/3));
    document.body.removeEventListener('wheel', handleScroll);
    document.body.addEventListener('wheel', handleScroll);
  }, [screenHeight, setScreenHeight]);

  return (<ModalProvider>
    <SessionProvider session={session}>
      <Component {...pageProps}/>
      <Footer/>
    </SessionProvider>
    {enoughPosition ? <ButtonBackToTop/> : null}
  </ModalProvider>);
}