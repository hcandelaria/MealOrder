'use client';
import { useEffect, useState } from 'react';
import CartItem from '../CartItem';
import { ShoppingCartType } from '../interface';
import { getAllOrders, UpdateOrderStatus } from '../lib/api';
import { formatPhoneNumber } from '../lib/format';
import LoadingModal from '../LoadingModal';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [data, setData] = useState<ShoppingCartType[]>([]);
  const [serviceDate, setServiceDate] = useState('');
  useEffect(() => {
    setLoading(true);
    getAllOrders().then((data: ShoppingCartType[]) => {
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
            <h1 className='text-xl text-red-500'>{order.service_date}</h1>
            <h1 className='text-xl text-red-500'>
              <span> {order.customer_name}</span>
              <span> {formatPhoneNumber(order.customer_phone)}</span>
              {order.status === 'approved' && (
                <span className='px-2 text-white uppercase bg-green-500 rounded-full'>
                  {order.status}
                </span>
              )}
              {order.status === 'declined' && (
                <span className='px-2 text-white uppercase bg-red-500 rounded-full'>
                  {order.status}
                </span>
              )}
              {order.status === 'pending' && (
                <span className='px-2 text-white uppercase bg-orange-500 rounded-full'>
                  {order.status}
                </span>
              )}
            </h1>
            {order.items.map((item, index) => {
              return <CartItem key={index} item={item} index={index} />;
            })}
            <div className='font-bold text-black'>
              Comments:
              <span className='mx-1 font-normal text-md'>{order.comments}</span>
            </div>
            <div>
              <button
                className='col-span-2 px-2 mx-2 my-1 font-bold text-white bg-green-500 rounded-full'
                onClick={() => {
                  setUpdating(true);
                  const payload = {
                    status: 'approved',
                    service_date: order.service_date,
                    shopping_cart_id: order.shopping_cart_id,
                  };
                  UpdateOrderStatus(payload).then(() => {
                    let temporaryarray = data.slice();
                    temporaryarray[index]['status'] = 'approved';
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
                  const payload = {
                    status: 'declined',
                    service_date: order.service_date,
                    shopping_cart_id: order.shopping_cart_id,
                  };
                  UpdateOrderStatus(payload).then(() => {
                    let temporaryarray = data.slice();
                    temporaryarray[index]['status'] = 'declined';
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
