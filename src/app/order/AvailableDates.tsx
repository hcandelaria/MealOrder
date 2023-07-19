'use client';
import { unmarshall } from '@aws-sdk/util-dynamodb';
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
    getAllMenuItems().then((rawData) => {
      if (!rawData) return;
      let tempDates: any = [];

      // unmarshall data
      const data = rawData.map((i: any) => {
        const item = unmarshall(i);
        tempDates = [
          ...tempDates,
          ...Array.from(
            calculateRecurrence(item.Data.Available_Date, item.Data.Recurrence)
          ),
        ];
        return item;
      });
      setData(data);
      addItems(data);

      // get unique dates
      setDates(Array.from(new Set(tempDates)));
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return <LoadingModal message='Please wait...' />;
  if (!data) return <>Not available dates to order. Please try again later.</>;

  return (
    <>
      <div>
        <h1 className='text-xl uppercase dark:text-red-500'>Select a date:</h1>
        <div className='grid grid-cols-4'>
          {dates.map((date: any, index) => {
            return (
              <button
                key={index}
                className='col-span-2 px-2 mx-2 my-1 font-bold text-black bg-white border-black rounded-full dark:bg-red-500 dark:text-black'
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
