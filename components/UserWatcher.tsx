

import { isServer } from '@/constants/index';
import { useRootStore } from '@/providers/RootStoreProvider';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function UserWatcher() {

  const rootStore = useRootStore();
  const { user, isLoading, checkSession } = useUser();
  const router = useRouter();


  useEffect(() => {
    if (!isServer) rootStore.initialize();
  }, [])

  useEffect(() => {
    // attempt to silently log in a user who has an active session on another simwin website
    (async () => {
      if (!user && !isLoading) {
        await fetch('/api/silent-auth', { mode: 'no-cors' });
        if (checkSession) checkSession();
      }
    })();
  }, [checkSession, user, isLoading]);


  //TODO: Temporary
  useEffect(() => {
    if (user && router) {
      // @ts-ignore
      !user.app_metadata || (user.app_metadata && user.app_metadata.isOnboarded === false)
        // router.push('/onboard')
    }
  

  }, [user,router])

  return null;
}


export default UserWatcher;
