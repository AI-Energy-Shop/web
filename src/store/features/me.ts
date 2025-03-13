import { createSlice } from '@reduxjs/toolkit';

export interface ShippingAddress {
  id?: string | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
  isActive?: boolean | null;
  company?: string | null;
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
  user_type?: string;
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
  token?: string;
}

const initialState: InitialState = {
  me: undefined,
  meAdmin: undefined,
  token: undefined,
};

export const meSlice = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {
    setMe: (state, { payload, type }: { payload: Me; type: string }) => {
      state.me = payload;
    },
    setMeAdmin: (state, { payload, type }: { payload: Me; type: string }) => {
      state.meAdmin = payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeUserData: (state) => {
      state.me = undefined;
      state.meAdmin = undefined;
      state.token = undefined;
    },
  },
});

export const { setMe, setMeAdmin, setToken, removeUserData } = meSlice.actions;

export default meSlice.reducer;
