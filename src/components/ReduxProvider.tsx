'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
  // return (
  //   <PersistGate loading={null} persistor={persistor}>
  //     <Provider store={store}>{children}</Provider>
  //   </PersistGate>
  // );
};

export default ReduxProvider;
