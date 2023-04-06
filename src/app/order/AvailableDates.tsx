'use client';
import { useEffect, useState } from 'react';
import { useItem } from '../Context/ItemContext';
import { getAllMenuItems } from '../lib/api';
import { calculateRecurrence } from '../lib/dates';
import LoadingModal from '../LoadingModal';

export default function AvailableDates() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const { setServiceDate } = useItem();
  const { addItems } = useItem();

  useEffect(() => {
    setLoading(true);
    getAllMenuItems().then((data) => {
      setData(data);
      addItems(data);

      let tempDates: any = [];

      data.map((item: any) => {
        tempDates = [
          ...tempDates,
          ...Array.from(
            calculateRecurrence(item.available_date, item.recurrence)
          ),
        ];
      });

      // get unique dates
      setDates(Array.from(new Set(tempDates)));
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Please wait...' />;
  if (!data) return <>Not available dates to order. Please try again later.</>;

  return (
    <>
      <div>
        <h1 className='text-red-500 uppercase text-3xl'>
          Start Your Order for:
        </h1>
        <div className='grid grid-cols-4'>
          {dates.map((date: any, index) => {
            return (
              <button
                key={index}
                className='bg-black text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
                onClick={() => setServiceDate(date)}
              >
                {date}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
