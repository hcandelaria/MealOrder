'use client';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';
import { Item } from './interface';
import { getAllMenuItems, getAllOrders } from './lib/api';

const promos = [
  { title: 'BBQ Rib', price: 9.99, src: 'MenuItem5' },
  { title: 'Pinchos', price: 9.99, src: 'MenuItem4' },
  { title: 'BBQ Chicken', price: 9.9, src: 'MenuItem1' },
];

export default function Home() {
  const { addItem } = useShoppingCart();
  const [item] = useState<Item>({
    PK: '#DELETEM',
    SK: '#DELETEME',
    Data: {
      Name: 'BBQ Chicken',
      Description: 'test',
      Status: 'active',
      Price: 9.99,
      Thumbnail_Url: '',
      Size: ['Small', 'Large'],
      Spicy_Level: ['Hot', 'Mild'],
      Current_Size: 'large',
      Current_Spicy_Level: 'hot',
    },
  });

  useEffect(() => {
    // getAllOrders().then((data: any) => {
    //   console.log(data);
    //   data.forEach((element) => {
    //     console.log(unmarshall(element));
    //   });
    // });
  });

  return (
    <>
      <div className='grid mx-2'>
        <div className='grid md:flex'>
          <Link
            href='/order'
            className='rounded-lg uppercase w-96 m-2 px-3 py-2 text-center border-2  align-middle border-black bg-white dark:border-white dark:bg-red-500 dark:text-white font-medium dark:hover:bg-white/5 dark:hover:text-red-900 md:w-[50%]'
          >
            Order Now
          </Link>
          <Link
            href='/menu'
            className='rounded-lg uppercase w-96 m-2 px-3 py-2 text-center border-2  align-middle border-black bg-white dark:border-white dark:bg-red-500 dark:text-white font-medium dark:hover:bg-white/5 dark:hover:text-red-900 md:w-[50%]'
          >
            Menu
          </Link>
        </div>
      </div>
      <section className='grid grid-cols-1 m-2 px-3 py-2 mx-auto md:w-[50%]'>
        {promos.map((promo, index) => {
          return (
            <div key={index} className='relative p-2'>
              <img
                alt={`${promo.title}`}
                src={`./img/${promo.src}.jpg`}
                className='border-2 rounded-3xl dark:border-black'
              />
              <div className='absolute px-4 py-2 bottom-4 right-4 '>
                <div className='grid'>
                  <h1 className='uppercase text-3xl mx-2 [text-shadow:_-2px_3px_1px_rgb(127_28_29_/_100%)] text-white'>
                    {promo.title}
                  </h1>
                  <br />
                  <h1 className='text-white text-3xl mx-2 text-right [text-shadow:_-2px_3px_1px_rgb(127_28_29_/_100%)]'>
                    ${promo.price}
                  </h1>
                  <button
                    className='rounded-lg  py-3 px-6 font-sans text-xs font-bold uppercase  shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  bg-red-500 text-white dark:text-black shadow-red-500/20 hover:shadow-red-500/40'
                    onClick={() => {
                      addItem(item);
                    }}
                  >
                    add to order
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
