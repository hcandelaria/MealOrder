'use client';
import { useEffect, useState } from 'react';
import { useItem } from '../Context/ItemContext';
import MenuItem from '../MenuItem';
export default function AvailableItems({
  isShoppable = true,
}: {
  isShoppable: boolean;
}) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { items } = useItem();

  if (isLoading) return <>loading...</>;
  if (!items) return <>Error getting data</>;

  return (
    <section className='grid grid-cols-12'>
      {items.map((item: any) => {
        return (
          <MenuItem
            key={item.PK + '#' + item.SK}
            item={item}
            addToCart={isShoppable}
          />
        );
      })}
    </section>
  );
}
