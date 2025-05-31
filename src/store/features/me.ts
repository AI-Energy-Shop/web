import { createSlice } from '@reduxjs/toolkit';

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
      warehouseLocation: {
        title: '',
        name: '',
        address: {
          city: '',
          unit: '',
          street: '',
          suburb: '',
          state: '',
          postcode: '',
        },
      },
    },
  },
  meAdmin: {
    id: '',
    email: '',
    username: '',
    blocked: false,
    confirmed: false,
    role: '',
    phone: '',
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
      me: initialState.me,
      meAdmin: initialState.meAdmin,
    }),
  },
});

export const { setMe, setMeAdmin, logout } = meSlice.actions;

export default meSlice.reducer;
