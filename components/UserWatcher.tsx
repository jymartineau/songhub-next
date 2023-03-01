

import { isServer } from '@/constants/index';
import { useRootStore } from '@/providers/RootStoreProvider';
import { useEffect } from 'react';

function UserWatcher() {

  const rootStore = useRootStore();



  useEffect(() => {
      if (!isServer)  rootStore.initialize();
    },[])


  return null;
}

export default UserWatcher;
