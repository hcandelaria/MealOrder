'use client';
import React from 'react';
import { ItemProvider } from './ItemContext';
import { ShoppingCartProvider } from './ShoppingCartContext';
import { UserProvider } from './UserContext';
interface ProviderProps {
  children: React.ReactNode;
}

const providers = [ShoppingCartProvider, UserProvider, ItemProvider];

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return providers.reduce((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, <>{children}</>);
};

export default Providers;
