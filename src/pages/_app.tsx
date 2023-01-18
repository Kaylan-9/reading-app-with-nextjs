import { SessionProvider } from '@/contexts/SessionContext';
import '../app/globals.css';

interface MyAppInterface {
  Component: any;
  pageProps: any;
}

export default function MyApp({ Component, pageProps }: MyAppInterface) {
  return <SessionProvider>
    <Component {...pageProps} />
  </SessionProvider>;
}