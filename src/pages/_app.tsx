import ModalProvider from '@/contexts/ModalContext';
import { IMyAppProps } from '@/types/pages/IMyAppProps';
import { GetServerSideProps } from 'next';
import { getCsrfToken, getProviders, SessionProvider } from 'next-auth/react';
import '../app/globals.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {props: {providers, csrfToken}}
}

export default function MyApp({ Component, pageProps: {session, ...pageProps}}: IMyAppProps) {
  return (<ModalProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ModalProvider>);
}