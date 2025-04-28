import { CollectionFiltersInput, ProductFiltersInput } from '@/lib/gql/graphql';
import { createSlice } from '@reduxjs/toolkit';

export interface SelectedFilter {
  id: string;
  key: string;
  value: string;
}

export interface ProductFilter {
  id: string;
  key: string;
  value: string;
}

export interface InitialState {
  productCount: number;
  selectedFilters: SelectedFilter[];
  productFilters: ProductFiltersInput;
  collectionFilters: CollectionFiltersInput;
}

const initialState: InitialState = {
  productCount: 0,
  selectedFilters: [],
  productFilters: {},
  collectionFilters: {},
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductCount: (state, action) => {
      state.productCount = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setProductFilters: (state, action) => {
      state.productFilters = action.payload;
    },
    setCollectionFilters: (state, action) => {
      state.collectionFilters = action.payload;
    },
  },
});

export const { setProductCount, setSelectedFilters, setProductFilters, setCollectionFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
