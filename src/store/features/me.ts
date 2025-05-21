import { createSlice } from '@reduxjs/toolkit';

export interface ShippingAddress {
  documentId: string;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  isActive?: boolean | null;
  company?: string | null;
  phone?: string | null;
  name?: {
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
  };
}

export interface Me {
  id: string;
  email: string;
  username?: string;
  blocked?: boolean;
  confirmed?: any;
  user_level?: string;
  business_name?: string;
  business_number?: string;
  business_type?: string;
  phone?: string;
  account_detail?: {
    level?: string;
    name?: {
      first_name?: string;
      middle_name?: string;
      last_name?: string;
    };
    shipping_addresses?: ShippingAddress[];
  };
}

export interface InitialState {
  me?: Me;
  meAdmin?: Me;
}

const initialState: InitialState = {
  me: {
    id: '',
    email: '',
    username: '',
    blocked: false,
    confirmed: false,
    user_level: '',
    business_name: 'Login',
    business_number: '',
    business_type: '',
    phone: '',
    account_detail: {
      level: '',
      name: {
        first_name: '',
        middle_name: '',
        last_name: '',
      },
      shipping_addresses: [],
    },
  },
  meAdmin: {
    id: '',
    email: '',
    username: '',
    blocked: false,
    confirmed: false,
    user_level: '',
    business_name: '',
    business_number: '',
    business_type: '',
    phone: '',
    account_detail: {
      level: '',
      name: {
        first_name: '',
        middle_name: '',
        last_name: '',
      },
      shipping_addresses: [],
    },
  },
};

export const meSlice = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {
    setMe: (state, { payload }: { payload: Me }) => ({
      ...state,
      me: payload,
    }),
    setMeAdmin: (state, { payload }: { payload: Me }) => ({
      ...state,
      meAdmin: payload,
    }),
    logout: (state) => ({
      ...state,
      me: undefined,
      meAdmin: undefined,
    }),
  },
});

export const { setMe, setMeAdmin, logout } = meSlice.actions;

export default meSlice.reducer;
