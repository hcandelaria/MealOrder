'use client';
import { Icon } from '@iconify/react';
import { useItem } from '../Context/ItemContext';
import AvailableDates from './AvailableDates';
import AvailableItems from './AvailableItems';
export default function Order() {
  const { service_date, setServiceDate } = useItem();

  return (
    <>
      {service_date === '' ? (
        <>
          <h1 className='uppercase text-3xl text-black dark:text-red-500'>
            Start Your Order
          </h1>
          <AvailableDates />
        </>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center mx-0 my-auto'>
            <h1 className='text-2xl font-bold relative text-white'>
              {service_date}
              <div className='inline-flex'>
                <Icon
                  icon='ph:x-circle'
                  className='w-6 h-6 rounded-full text-white dark:bg-black dark:text-red-500 dark:hover:fill-red-800'
                  onClick={() => {
                    setServiceDate('');
                  }}
                />
              </div>
            </h1>
          </div>
          <AvailableItems isShoppable={true} />
        </>
      )}
    </>
  );
}
