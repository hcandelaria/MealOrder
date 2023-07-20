'use client';
import { Icon } from '@iconify/react';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useShoppingCart } from './Context/ShoppingCartContext';
import { Item } from './interface';

export default function CartItem({
  item,
  index,
}: {
  index: number;
  item: Item;
}) {
  const { addItem, removeItem } = useShoppingCart();
  const [spicy, setSpicy] = useState(item.Data.Current_Spicy_Level);
  const [size, setSize] = useState(item.Data.Current_Size);
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
    addItem(payload);
  };
  return (
    <>
      <div className='relative my-2 border-solid hover:drop-shadow-lg'>
        <Icon
          className='rounded-full mt-[-16px] w-[24px] h-[24px] absolute top-0 right-10 bg-black text-red-500 hover:fill-red-800'
          icon='ph:x-circle'
          onClick={() => {
            removeItem(index);
          }}
        />

        <section className='items-center justify-center col-span-12 m-10 bg-white shadow-xl shadow-card rounded-xl bg-clip-border md:col-span-6 dark:bg-slate-900 dark:text-white lg:col-span-4'>
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
                  {Array.from(item.Data.Size).map((size, i) => {
                    return <option key={i}>{`${size}`}</option>;
                  })}
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
                    {Array.from(item.Data.Spicy_Level).map((spicy, i) => {
                      return <option key={i}>{`${spicy}`}</option>;
                    })}
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
      </div>
    </>
  );
}
