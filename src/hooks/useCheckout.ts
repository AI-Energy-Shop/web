// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';

export const useCheckoutDispatch = () => useDispatch<AppDispatch>();
export const useCheckoutSelector: TypedUseSelectorHook<RootState> = useSelector;
