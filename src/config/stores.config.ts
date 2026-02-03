import type { StoreConfig } from '../types/store';

export const stores: Record<string, StoreConfig> = {
  store1: {
    id: 'store1',
    name: 'Unicorn Store – One Horizon Center',
    address: {
      line1: 'Plaza Tower, T-01',
      line2: 'Golf Course Rd',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122009',
    },
    contact: {
      email: 'support@unicornstore.com',
      phone: '+91 98765 43210',
    },
    disclaimer: 'This pre-booking page is valid only for One Horizon Center, Gurugram store.',
    pageTitle: 'Unicorn Store - One Horizon Center',
  },
  store2: {
    id: 'store2',
    name: 'Unicorn Store – Store 2',
    address: {
      line1: 'Address Line 1',
      line2: 'Address Line 2',
      city: 'City',
      state: 'State',
      pincode: '123456',
    },
    contact: {
      email: 'support2@unicornstore.com',
      phone: '+91 98765 43211',
    },
    disclaimer: 'This pre-booking page is valid only for Store 2.',
    pageTitle: 'Unicorn Store - Store 2',
  },
  store3: {
    id: 'store3',
    name: 'Unicorn Store – Store 3',
    address: {
      line1: 'Address Line 1',
      line2: 'Address Line 2',
      city: 'City',
      state: 'State',
      pincode: '123456',
    },
    contact: {
      email: 'support3@unicornstore.com',
      phone: '+91 98765 43212',
    },
    disclaimer: 'This pre-booking page is valid only for Store 3.',
    pageTitle: 'Unicorn Store - Store 3',
  },
  store4: {
    id: 'store4',
    name: 'Unicorn Store – Store 4',
    address: {
      line1: 'Address Line 1',
      line2: 'Address Line 2',
      city: 'City',
      state: 'State',
      pincode: '123456',
    },
    contact: {
      email: 'support4@unicornstore.com',
      phone: '+91 98765 43213',
    },
    disclaimer: 'This pre-booking page is valid only for Store 4.',
    pageTitle: 'Unicorn Store - Store 4',
  },
  store5: {
    id: 'store5',
    name: 'Unicorn Store – Store 5',
    address: {
      line1: 'Address Line 1',
      line2: 'Address Line 2',
      city: 'City',
      state: 'State',
      pincode: '123456',
    },
    contact: {
      email: 'support5@unicornstore.com',
      phone: '+91 98765 43214',
    },
    disclaimer: 'This pre-booking page is valid only for Store 5.',
    pageTitle: 'Unicorn Store - Store 5',
  },
};

// Default store (fallback)
export const defaultStoreId = 'store1';
