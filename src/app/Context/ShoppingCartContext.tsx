'use client';
import React, { createContext, useState } from 'react';
import { calculateRecurrence } from '../lib/dates';

interface Item {
  item_id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  thumbnail_url: string;
  size: string;
  spicy_level: string;
  available_date: string;
  recurrence: string;
}

interface ShoppingCartType {
  shoppingCartId: string;
  serviceDate: string;
  customerName: string;
  customerPhone: string;
  comments: string;
  status: string;
  items: Item[];
  addItem: (item: Item) => void;
  addItems: (item: [Item]) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}

export const ShoppingCartContext = createContext<ShoppingCartType>({
  shoppingCartId: '',
  serviceDate: '',
  customerName: '',
  customerPhone: '',
  comments: '',
  status: 'pending',
  items: [],
  addItem: () => {},
  addItems: () => {},
  removeItem: () => {},
  clearItems: () => {},
  filterItems: () => {},
  setServiceDate: () => {},
});

export const useShoppingCart = () => React.useContext(ShoppingCartContext);

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [shoppingCartId, setShoppingCartId] = useState('');
  const [serviceDate, updateServiceDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState('shopping');

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };
  const addItems = (item: [Item]) => {
    setItems([...items, ...item]);
  };
  const removeItem = (index: number) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const filterItems = (serviceDate: string) => {
    setItems(
      items.filter((item) => {
        let tempDates = calculateRecurrence(
          item.available_date,
          item.recurrence
        );
        return tempDates.has(serviceDate);
      })
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  const setServiceDate = (serviceDate: string) => {
    updateServiceDate(serviceDate);
    filterItems(serviceDate);
  };

  const shoppingCart: ShoppingCartType = {
    shoppingCartId,
    serviceDate,
    customerName,
    customerPhone,
    comments,
    status,
    items,
    addItem,
    addItems,
    removeItem,
    clearItems,
    filterItems,
    setServiceDate,
  };

  return (
    <ShoppingCartContext.Provider value={shoppingCart}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
