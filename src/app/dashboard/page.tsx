'use client';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { useEffect, useState } from 'react';
import CartItem from '../CartItem';
import { ShoppingCartType } from '../interface';
import { getAllOrders, UpdateOrderStatus } from '../lib/api';
import { formatPhoneNumber } from '../lib/format';
import LoadingModal from '../LoadingModal';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [serviceDate, setServiceDate] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllOrders().then((data: any[]) => {
      if (!data) return;
      setData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Loading orders...' />;
  if (!data) return <>No orders</>;

  return (
    <>
      <h1 className='text-3xl text-red-500'>Dashboard</h1>
      {data.map((order, index) => {
        return (
          <section
            key={index}
            className='my-2 rounded-lg shadow-lg bg-neutral-200 hover:bg-slate-400'
          >
            <h1 className='text-xl text-red-500'>{order.Data.Service_Date}</h1>
            <h1 className='text-xl text-red-500'>
              <span> {order.Data.Customer_Name}</span>
              <span> {formatPhoneNumber(order.Data.Customer_Phone)}</span>
              {order.Data.Status === 'Approved' && (
                <span className='px-2 text-white uppercase bg-green-500 rounded-full'>
                  {order.Data.Status}
                </span>
              )}
              {order.Data.Status === 'Declined' && (
                <span className='px-2 text-white uppercase bg-red-500 rounded-full'>
                  {order.Data.Status}
                </span>
              )}
              {order.Data.Status === 'Pending' && (
                <span className='px-2 text-white uppercase bg-orange-500 rounded-full'>
                  {order.Data.Status}
                </span>
              )}
            </h1>
            {order.items.map((item: any, index: number) => {
              return <CartItem key={index} item={item} index={index} />;
            })}
            <div className='font-bold text-black'>
              Comments:
              <span className='mx-1 font-normal text-md'>
                {order.Data.Customer_Comments}
              </span>
            </div>
            <div>
              <button
                className='col-span-2 px-2 mx-2 my-1 font-bold text-white bg-green-500 rounded-full'
                onClick={() => {
                  setUpdating(true);
                  const payload = marshall({
                    PK: order.PK,
                    SK: order.SK,
                    Data: {
                      ...order.Data,
                      Status: 'Approved',
                    },
                  });

                  UpdateOrderStatus(payload).then(() => {
                    let temporaryarray = data.slice();
                    temporaryarray[index].Data.Status = 'Approved';
                    setData(temporaryarray);
                    setUpdating(false);
                  });
                }}
              >
                Approve
              </button>

              <button
                className='col-span-2 px-2 mx-2 my-1 font-bold text-white bg-red-500 rounded-full'
                onClick={() => {
                  setUpdating(true);

                  const payload = marshall({
                    PK: order.PK,
                    SK: order.SK,
                    Data: {
                      ...order.Data,
                      Status: 'Declined',
                    },
                  });
                  UpdateOrderStatus(payload).then(() => {
                    let temporaryarray = data.slice();
                    temporaryarray[index].Data.Status = 'Declined';
                    setData(temporaryarray);
                    setUpdating(false);
                  });
                }}
              >
                Decline
              </button>
            </div>
          </section>
        );
      })}
      {isUpdating && <LoadingModal message='Updating order...' />}
    </>
  );
}
