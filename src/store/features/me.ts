import { createSlice } from '@reduxjs/toolkit';

export interface ShippingAddress {
  id?: string | null;
  street?: string | null;
  suburb?: string | null;
  state_territory?: string | null;
  postcode?: string | null;
  phone?: string | null;
  country?: string | null;
  isActive?: boolean | null;
  company?: string | null;
  name?: {
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
  };
}

interface Me {
  id: string;
  email: string;
  username: string;
  blocked: boolean;
  confirmed?: any;
  account_detail?: {
    business_name: string;
  };
  shipping_addresses?: ShippingAddress[];
}

export interface InitialState {
  me?: Me;
  token?: string;
}

const initialState: InitialState = {
  me: {
    id: '',
    email: '',
    username: '',
    blocked: false,
    confirmed: null,
    account_detail: {
      business_name: '',
    },
    shipping_addresses: [],
  },
  token: undefined,
};

export const meSlice = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {
    setMe: (state, { payload, type }: { payload: Me; type: string }) => {
      state.me = payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setMe, setToken } = meSlice.actions;

export default meSlice.reducer;
