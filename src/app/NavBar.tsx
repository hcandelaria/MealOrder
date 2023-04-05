'use client';
import Link from 'next/link';
import { useShoppingCart } from './Context/ShoppingCartContext';
const routes = [
  ['Home', '/', '0'],
  ['Order', '/order', '1'],
  ['Menu', '/menu', '2'],
  ['Dashboard', '/dashboard', '3'],
  // ['Update Menu', '/dashboard/menu', '4'],
];

const NavBar = () => {
  const { items } = useShoppingCart();

  return (
    <nav className='flex h-10 w-screeen justify-center space-x-4 bg-white/10'>
      {routes.map(([title, url, index]) => (
        <Link
          href={url}
          key={index}
          className='rounded-lg px-3 py2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'
        >
          {title}
        </Link>
      ))}
      <Link
        href='/cart'
        className='rounded-lg px-3 py2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'
      >
        Cart {items.length}
      </Link>
    </nav>
  );
};
export default NavBar;
