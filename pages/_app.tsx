import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { RootStoreProvider } from '@/providers/RootStoreProvider';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <UserProvider>
      <RootStoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RootStoreProvider>
    </UserProvider>
  )
}
