import { useMemo } from 'react';
import { stores, defaultStoreId } from '@/config/stores.config';
import type { StoreConfig } from '../types/store';

export function useStoreConfig(): StoreConfig {
  return useMemo(() => {
    const storeId = import.meta.env.VITE_STORE_ID || defaultStoreId;
    const store = stores[storeId];
    
    if (!store) {
      console.warn(`Store with ID "${storeId}" not found. Falling back to default store.`);
      return stores[defaultStoreId];
    }
    
    return store;
  }, []);
}
