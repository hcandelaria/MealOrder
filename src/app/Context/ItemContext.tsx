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

interface ItemType {
  items: Item[];
  serviceDate: string;
  addItem: (item: Item) => void;
  addItems: (item: [Item]) => void;
  removeItem: (item: string) => void;
  filterItems: (serviceDate: string) => void;
  setServiceDate: (serviceDate: string) => void;
}

export const ItemContext = createContext<ItemType>({
  items: [],
  serviceDate: '',
  addItem: () => {},
  addItems: () => {},
  removeItem: () => {},
  filterItems: () => {},
  setServiceDate: () => {},
});

export const useItem = () => React.useContext(ItemContext);

export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [serviceDate, updateServiceDate] = useState('');

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };
  const addItems = (item: [Item]) => {
    setItems([...items, ...item]);
  };
  const removeItem = (item_id: string) => {
    setItems(items.filter((item) => item.item_id !== item_id));
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

  const setServiceDate = (serviceDate: string) => {
    updateServiceDate(serviceDate);
    filterItems(serviceDate);
  };
  const Items: ItemType = {
    items,
    serviceDate,
    addItem,
    addItems,
    removeItem,
    filterItems,
    setServiceDate,
  };
  return <ItemContext.Provider value={Items}>{children}</ItemContext.Provider>;
};
