'use client';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useShoppingCart } from './Context/ShoppingCartContext';
const routes = [
  ['Home', '/', 'ph:house'],
  ['Order', '/order', 'ph:shopping-cart'],
  ['Menu', '/menu', 'mdi:restaurant-menu'],
  ['Dashboard', '/dashboard', 'ph:gear'],
  // ['Demo', '/demo', '4'],
  // ['Update Menu', '/dashboard/menu', '4'],
];

const NavBar = () => {
  const { items } = useShoppingCart();

  return (
    <nav className='flex w-screeen justify-center space-x-4 py-2  bg-white/100  dark:bg-white/10 md:space-x-6'>
      {routes.map(([title, url, icon], index) => (
        <Link
          href={url}
          key={index}
          className='rounded-lg px-3 font-medium dark:text-red-700 hover:bg-white/5 hover:text-red-900'
        >
          <Icon icon={icon} className='w-6 h-6 justify-center mx-auto' />
          <span className='text-xs'>{title}</span>
        </Link>
      ))}
      <Link
        href='/cart'
        className='rounded-lg px-3 relative font-medium hover:bg-white/5 hover:text-red-900 dark:text-red-700'
      >
        <Icon icon='iconoir:bbq' className='w-6 h-6 justify-center mx-auto' />
        <span className='text-xs'>BBQ</span>
        {items.length > 0 && (
          <span className='animate-ping absolute right-[-4px] top-[-5px] inline-flex h-4 w-4 rounded-full opacity-75 bg-black dark:bg-red-500'></span>
        )}
        <span className='rounded-full border-2 absolute mt-[-16px] w-[24px] h-[24px] right-[-8px] top-2 border-red-900 dark:border-red-700' />
        {items.length > 10 ? (
          <span className='absolute mt-[-16px] w-[24px] h-[24px] right-[-12px] top-2'>
            {items.length}
          </span>
        ) : (
          <span className='absolute mt-[-16px] w-[24px] h-[24px] right-[-15px] top-2'>
            {items.length}
          </span>
        )}
      </Link>
    </nav>
  );
};
export default NavBar;
