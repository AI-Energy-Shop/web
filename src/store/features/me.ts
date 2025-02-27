import { createSlice } from '@reduxjs/toolkit';

interface Me {
  id: string;
  email: string;
  username: string;
  blocked: boolean;
  confirmed?: any;
}

export interface InitialState {
  me?: Me;
  token?: string;
}

const initialState: InitialState = {
  me: undefined,
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
