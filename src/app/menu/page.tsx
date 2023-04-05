'use client';
import { useEffect, useState } from 'react';
import LoadingModal from '../LoadingModal';
import MenuItem from '../MenuItem';
import { getAllMenuItems } from '../lib/api';

export default function Menu() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((data: any) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Loading menu...' />;
  if (!data) return <>Menu not available</>;

  return (
    <>
      {data.map((item: any) => (
        <MenuItem
          key={item.item_id}
          name={item.name}
          description={item.description}
        />
      ))}
    </>
  );
}
