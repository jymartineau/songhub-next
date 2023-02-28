import React, { createContext, ReactNode, useContext } from 'react';
import { enableStaticRendering } from 'mobx-react';
import { configure } from 'mobx';
import { RootStore } from '@/stores/rootStore';

const isServer = typeof window === 'undefined'
if (!isServer) {
  configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    reactionRequiresObservable: false,
    observableRequiresReaction: false,
    disableErrorBoundaries: false,
  });
}

enableStaticRendering(isServer);

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;

}

export function RootStoreProvider({ children }: { children: ReactNode }) {
  const store = initializeStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

function initializeStore(): RootStore {
  const _store = store ?? new RootStore();

  // For SSG and SSR always create a new store
  if (isServer) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
