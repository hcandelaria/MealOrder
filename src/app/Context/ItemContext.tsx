'use client';
import React, { createContext, useState } from 'react';
import { Item, ItemType } from '../interface';
import { calculateRecurrence } from '../lib/dates';

export const ItemContext = createContext<ItemType>({
  items: [],
  service_date: '',
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
  const [service_date, updateServiceDate] = useState('');

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

  const setServiceDate = (serviceDate: string) => {
    updateServiceDate(serviceDate);
    filterItems(serviceDate);
  };
  const Items: ItemType = {
    items,
    service_date,
    addItem,
    addItems,
    removeItem,
    filterItems,
    setServiceDate,
  };
  return <ItemContext.Provider value={Items}>{children}</ItemContext.Provider>;
};
