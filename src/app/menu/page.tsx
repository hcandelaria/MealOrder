'use client';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { useEffect, useState } from 'react';
import { getAllMenuItems } from '../lib/api';
import LoadingModal from '../LoadingModal';
import MenuItem from '../MenuItem';

export default function Menu() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((rawData: any) => {
      if (!rawData) return;
      const data = rawData.map((i: any) => {
        return unmarshall(i);
      });
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
