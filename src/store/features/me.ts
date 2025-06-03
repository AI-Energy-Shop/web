import { createSlice } from '@reduxjs/toolkit';
import { setWarehouseLocation } from './cart';

type Name = {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
} | null;

export interface WarehouseLocation {
  id?: number;
  title?: string;
  name?: string;
  address?: {
    city?: string;
    unit?: string;
    street?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
  };
}

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
  confirmed?: boolean;
  user_level?: string;
  business_name?: string;
  business_number?: string;
  business_type?: string;
  phone?: string;
  role?: string;
  account_detail?: {
    level?: string;
    name?: Name;
    shipping_addresses?: ShippingAddress[];
    warehouseLocation?: WarehouseLocation;
  };
}

export interface InitialState {
  me?: Me;
  meAdmin?: Me;
}

const initialState: InitialState = {
  me: undefined,
  meAdmin: undefined,
};

export const meSlice = createSlice({
  name: 'me',
  initialState: initialState,
  reducers: {
    setMe: (state, { payload }: { payload: Me }) => ({
      ...state,
      me: payload,
    }),
    setSelectedWarehouseLocation: (
      state,
      { payload }: { payload: WarehouseLocation }
    ) => {
      if (state.me) {
        if (!state.me.account_detail) {
          state.me.account_detail = {};
        }
        state.me.account_detail.warehouseLocation = payload;
      }
    },
    setMeAdmin: (state, { payload }: { payload: Me }) => ({
      ...state,
      meAdmin: payload,
    }),
    logout: (state) => ({
      ...state,
      me: initialState.me,
      meAdmin: initialState.meAdmin,
    }),
  },
});

export const { setMe, logout, setMeAdmin, setSelectedWarehouseLocation } =
  meSlice.actions;

export default meSlice.reducer;
