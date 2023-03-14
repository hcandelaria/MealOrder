'use client';
import { getAllMenuItems } from '../lib/api';

const GetMenu = async () => {
  const data = await getAllMenuItems();
  console.log(data);
};

export default function Dashboard() {
  return (
    <>
      <h1 className='text-red-500 text-3xl'>Dashboard</h1>
      <h1 onClick={GetMenu}>test</h1>
    </>
  );
}
