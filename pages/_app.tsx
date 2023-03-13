import '@/styles/globals.css'
import 'react-h5-audio-player/lib/styles.css';
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RootStoreProvider } from '@/providers/RootStoreProvider';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

const ModalStackViewer = dynamic(
  () => import('../components/modals/ModalStackViewer'),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RootStoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
          <ModalStackViewer />
      </RootStoreProvider>
    </UserProvider>
  );
}
