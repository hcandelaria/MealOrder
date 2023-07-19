'use client';
import { useEffect, useState } from 'react';
import { getAllMenuItems } from '../lib/api';
import LoadingModal from '../LoadingModal';
import MenuItem from '../MenuItem';

export default function Menu() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((data: any) => {
      setData(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Loading menu...' />;
  if (!data) return <>Menu not available</>;

  return (
    <>
      <section className='grid grid-cols-12'>
        {data.map((item: any) => (
          <MenuItem key={item.item_id} item={item} addToCart={true} />
        ))}
      </section>
    </>
  );
}
