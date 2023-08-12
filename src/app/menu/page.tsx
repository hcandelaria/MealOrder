'use client';
import awsExports from '@/aws-exports';
import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { getAllMenuItems } from '../lib/api';
import LoadingModal from '../LoadingModal';
import MenuItem from '../MenuItem';

Amplify.configure({ ...awsExports, ssr: true });

export default function Menu() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((data: any) => {
      if (!data) return;
      setData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Loading menu...' />;
  if (!data) return <>Menu not available</>;

  return (
    <>
      <section className='grid grid-cols-12'>
        {data.map((item: any) => (
          <MenuItem
            key={item.PK + '#' + item.SD}
            item={item}
            addToCart={true}
          />
        ))}
      </section>
    </>
  );
}
