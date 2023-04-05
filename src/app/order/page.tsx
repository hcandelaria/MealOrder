'use client';
import { useItem } from '../Context/ItemContext';
import AvailableDates from './AvailableDates';
import AvailableItems from './AvailableItems';

export default function Order() {
  const { serviceDate } = useItem();

  return (
    <>
      {serviceDate === '' ? (
        <AvailableDates />
      ) : (
        <>
          {serviceDate}
          <br />
          <AvailableItems />
        </>
      )}
    </>
  );
}
