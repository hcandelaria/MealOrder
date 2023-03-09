import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className='text-red-500 text-3xl underline'>Hello world!</h1>
      <Link href={'/'} className='text-blue-400 underlin'>
        Home
      </Link>
    </>
  );
}
