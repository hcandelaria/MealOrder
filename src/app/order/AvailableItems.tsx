'use client';
import { useState } from 'react';
import { useItem } from '../Context/ItemContext';
import MenuItem from '../MenuItem';
export default function AvailableItems() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { items } = useItem();

  if (isLoading) return <>loading...</>;
  if (!items) return <>Error getting data</>;

  return (
    <>
      {items.map((item: any) => {
        return (
          <MenuItem
            key={item.item_id}
            name={item.name}
            description={item.description}
          />
        );
      })}
    </>
  );
}
