'use client';
import {
  MinusCircleIcon,
  MinusIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';

export default function CartItem({
  name,
  index,
  description,
}: {
  name: string;
  index: number;
  description: string;
}) {
  const { addItem, removeItem } = useShoppingCart();
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
      <div className='relative my-2 bg-neutral-100 border-solid hover:drop-shadow-lg'>
        <XCircleIcon
          className='rounded-full w-6 mt-[-16px] absolute top-0 right-0 bg-red-500 fill-white hover:fill-red-800 border-red-500 border-solid border'
          onClick={() => {
            removeItem(index);
          }}
        />
        <div className='mx-2'>
          <h2 className='text-2lx font-bold inline-block'>{name}</h2>
          <h2 className='text-2lx font-bold float-right'>${item.price}</h2>
          <p className='text-l'>{item.size + ' - ' + item.spicy_level}</p>
        </div>
      </div>
    </>
  );
}
