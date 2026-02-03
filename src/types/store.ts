export interface StoreAddress {
  line1: string;
  line2?: string;
  line3?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface StoreContact {
  email: string;
  phone: string;
}

export interface StoreConfig {
  id: string;
  name: string;
  address: StoreAddress;
  contact: StoreContact;
  disclaimer: string;
  pageTitle: string;
}
