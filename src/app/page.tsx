import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className='text-red-500 text-3xl'>Hello world!</h1>
      <Link href={'/dashboard'} className='text-blue-400 underline mx-2'>
        Dashboard
      </Link>
      <Link href={'/dashboard/menu'} className='text-blue-400 underline mx-2'>
        Menu
      </Link>
    </>
  );
}
