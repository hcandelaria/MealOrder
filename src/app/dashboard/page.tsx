import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <h1 className='text-red-500 text-3xl'>Dashboard</h1>
      <Link href={'/'} className='text-blue-400 underline mx-2'>
        Home
      </Link>
      <Link href={'/dashboard/menu'} className='text-blue-400 underline mx-2'>
        Menu
      </Link>
    </>
  );
}
