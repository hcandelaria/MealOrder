import Link from 'next/link';

export default function Login() {
  return (
    <>
      <h1 className='text-red-500 text-3xl'>Menu</h1>
      <Link href={'/'} className='text-blue-400 underline mx-2'>
        Home
      </Link>
      <Link href={'/dashboard'} className='text-blue-400 underline mx-2'>
        Dashboard
      </Link>
    </>
  );
}
