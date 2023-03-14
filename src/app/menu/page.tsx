'use client';
import { useEffect, useState } from 'react';
import { getAllMenuItems } from '../lib/api';
import MenuItem from './MenuItem';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <>loading...</>;
  if (!data) return <>Menu not available</>;

  return (
    <>
      <h1 className='text-red-500 text-3xl'>Menu</h1>
      {data.map((item: any) => (
        <MenuItem key={item.id} title={item.title} details={item.details} />
      ))}
    </>
  );
}
