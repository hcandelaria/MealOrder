'use client';
import React, { createContext, useState } from 'react';
import { Item, ShoppingCartType } from '../interface';
import { calculateRecurrence } from '../lib/dates';

export const ShoppingCartContext = createContext<ShoppingCartType>({
  shopping_cart_id: '',
  service_date: '',
  customer_name: '',
  customer_phone: '',
  comments: '',
  status: 'pending',
  items: [],
  addItem: () => {},
  updateItem: () => {},
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
  const [shopping_cart_id, setShoppingCartId] = useState('');
  const [service_date, updateServiceDate] = useState('');
  const [customer_name, setCustomerName] = useState('');
  const [customer_phone, setCustomerPhone] = useState('');
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
  const updateItem = (item: Item, index: number) => {};
  const filterItems = (serviceDate: string) => {
    setItems(
      items.filter((item) => {
        if (item.Data.Available_Date && item.Data.Recurrence) {
          let tempDates = calculateRecurrence(
            item.Data.Available_Date,
            item.Data.Recurrence
          );
          return tempDates.has(serviceDate);
        }
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
    shopping_cart_id,
    service_date,
    customer_name,
    customer_phone,
    comments,
    status,
    items,
    addItem,
    updateItem,
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
