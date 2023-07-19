'use client';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';
import { Item } from './interface';

export default function MenuItem({
  item,
  addToCart,
}: {
  item: Item;
  addToCart: boolean;
}) {
  const { addItem } = useShoppingCart();
  const [spicy, setSpicy] = useState(
    item.Data.Spicy_Level.entries().next().value[0]
  );
  const [size, setSize] = useState(item.Data.Size.entries().next().value[0]);
  const [quantity, setQuantity] = useState(0);

  const handleOrderSize = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSize(e.target.value);
  };
  const handleOrderSpice = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSpicy(e.target.value);
  };
  const handleOrderQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuantity(parseInt(e.target.value));
  };
  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const payload = { ...item };
    payload.Data.Current_Size = size;
    payload.Data.Current_Spicy_Level = spicy;
    payload.Data.Order_Quantity = quantity;
    console.log(payload);
    addItem(payload);
  };

  return (
    <>
      <section className='items-center justify-center col-span-12 m-10 bg-white shadow-xl shadow-card rounded-xl bg-clip-border md:col-span-6 dark:bg-slate-900 dark:text-white lg:col-span-4'>
        <div className='mx-4 -mt-6 translate-y-0'>
          <img
            className='w-auto rounded-lg'
            src={item.Data.Thumbnail_Url || './img/MenuItem5.jpg'}
            alt={item.Data.Description}
          />
        </div>
        <div className='flex-1 p-6 text-secondary'>
          <h1 className='inline-block text-2xl font-medium'>
            {item.Data.Name}
          </h1>
          <span className='justify-end mx-2 text-xl'>${item.Data.Price}</span>
          <p className='opcacity-60 text-md'>{item.Data.Description}</p>
          <div className='grid grid-cols-12'>
            <div className='col-span-6'>
              <span className='mb-3 opcacity-60 text-md'>Size:</span>
              <select
                className='m-2 mb-3 text-black rounded-lg text-md'
                defaultValue={size}
                onChange={handleOrderSize}
              >
                <>
                  {Array.from(item.Data.Size).map((size, i) => {
                    return <option key={i}>{`${size}`}</option>;
                  })}
                </>
              </select>
            </div>
            {spicy && (
              <div className='col-span-6'>
                <span className='mb-3 opcacity-60 text-md'>Spicy:</span>
                <select
                  className='m-2 mb-3 text-black rounded-lg text-md'
                  defaultValue={spicy}
                  onChange={handleOrderSpice}
                >
                  <>
                    {Array.from(item.Data.Spicy_Level).map((spicy, i) => {
                      return <option key={i}>{`${spicy}`}</option>;
                    })}
                  </>
                </select>
              </div>
            )}
          </div>
          <div className='grid grid-cols-12'>
            <div className='col-span-6'>
              <span className='mb-3 opcacity-60 text-md'>QTY:</span>
              <input
                className='w-10 px-4 py-2 mx-2 text-center text-black rounded-lg text-md'
                type='tel'
                defaultValue={1}
                onChange={handleOrderQuantity}
              />
            </div>
            <div className='col-span-6'>
              <button
                className='rounded-lg col-span-8 py-3 px-6 text-xs font-bold uppercase  shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-red-500 text-white dark:text-black shadow-red-500/20 hover:shadow-red-500/40'
                data-ripple-light='true'
                onClick={handleAddToCart}
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
