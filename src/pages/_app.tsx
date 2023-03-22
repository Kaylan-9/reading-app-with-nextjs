import Footer from '@/components/Footer';
import CategoriesProvider from '@/contexts/CategoriesContext';
import CookiePolicyProvider from '@/contexts/CookiePolicyContext';
import MangaViewerProvider from '@/contexts/MangaViewerContext';
import ModalProvider from '@/contexts/ModalContext';
import { IMyAppProps } from '@/types/pages/IMyAppProps';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { getCsrfToken, getProviders, SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import { useCallback, useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import '../app/globals.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {props: {providers, csrfToken}}
}

export const StButtonBackToTop = styled.button`
  padding: 1em;
  border-radius: 1em;
  color: rgb(var(--foreground-primary));
  position: fixed;
  border: none;
  background-color: #8b33ff;
  bottom: 50px;
  right: 50px;
  z-index: 1002;
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
  }, [screenHeight, setScreenHeight]);

  useEffect(() => {setScreenHeight(document.body.clientHeight)}, []);
  useEffect(() => {
    setEnoughPosition((document.body.getClientRects()[0].y*-1)>(screenHeight/3));
    document.body.removeEventListener('wheel', handleScroll);
    document.body.addEventListener('wheel', handleScroll);
  }, [screenHeight, setScreenHeight]);

  return (<>
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8472335099605606" crossOrigin="anonymous"/>
    <CookiePolicyProvider>
      <ModalProvider>
        <SessionProvider session={session}>
          <CategoriesProvider>
            <MangaViewerProvider>
              <Component {...pageProps}/>
              <Footer/>
            </MangaViewerProvider>
          </CategoriesProvider>
        </SessionProvider>
        {enoughPosition ? <ButtonBackToTop/> : null}
      </ModalProvider>
    </CookiePolicyProvider>
  </>);
}