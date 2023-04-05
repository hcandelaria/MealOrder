'use client';
import { useState } from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';

export default function MenuItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const { addItem } = useShoppingCart();
  const [item] = useState({
    name: name,
    description: description,
    status: 'active',
    price: 9.99,
    thumbnail_url: '',
    size: 'large',
    spicy_level: 'hot',
  });
  return (
    <>
      <h2 className='text-2lx font-bold'>{name}</h2>
      <p className='text-l'>{description}</p>
      <button
        className='bg-black text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
        onClick={() => {
          addItem(item);
        }}
      >
        add to order
      </button>
    </>
  );
}
