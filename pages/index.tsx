/* eslint-disable no-unused-vars */
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRootStore } from '@/providers/RootStoreProvider'
import { useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { format } from 'path'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// const inter = Inter({ subsets: ['latin'] })
export default function Home()  {
  const {user, checkSession} = useUser();
  return (
    <>
      <Head>
        <title>Songhub</title>
        <meta name="Songhub" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex justify-center items-center flex-col h-screen'>
         
          {
            user ? (<>
             <Link href='/api/auth/logout'>Logout</Link>
              <code className='w-fit mx-auto'>
            {JSON.stringify(user)}
          </code>
            </> ): (<>
             <Link href='/api/auth/login'>Login</Link>
            </>)
          }
         

        </div>
      </main>
    </>
  )
}

// Bug in current 
export const getServerSideProps = withPageAuthRequired();