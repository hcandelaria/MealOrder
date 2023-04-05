'use client';
import React, { createContext, useState } from 'react';
import { Item, ItemType } from '../interface';
import { calculateRecurrence } from '../lib/dates';

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
  const removeItem = (index: number) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const filterItems = (serviceDate: string) => {
    setItems(
      items.filter((item) => {
        if (item.available_date && item.recurrence) {
          let tempDates = calculateRecurrence(
            item.available_date,
            item.recurrence
          );
          return tempDates.has(serviceDate);
        }
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
