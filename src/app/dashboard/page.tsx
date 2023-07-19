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
      console.log(data);
    });
  }, []);

  if (isLoading) return <LoadingModal message='Loading orders...' />;
  if (!data) return <>No orders</>;

  return (
    <>
      <h1 className='text-red-500 text-3xl'>Dashboard</h1>
      {data.map((order, index) => {
        return (
          <section
            key={index}
            className='bg-neutral-200 shadow-lg rounded-lg hover:bg-slate-400 my-2'
          >
            <h1 className='text-red-500 text-xl'>{order.service_date}</h1>
            <h1 className='text-red-500 text-xl'>
              <span> {order.customer_name}</span>
              <span> {formatPhoneNumber(order.customer_phone)}</span>
              {order.status === 'approved' && (
                <span className='bg-green-500 uppercase rounded-full text-white px-2'>
                  {order.status}
                </span>
              )}
              {order.status === 'declined' && (
                <span className='bg-red-500 uppercase rounded-full text-white px-2'>
                  {order.status}
                </span>
              )}
              {order.status === 'pending' && (
                <span className='bg-orange-500 uppercase rounded-full text-white px-2'>
                  {order.status}
                </span>
              )}
            </h1>
            {order.items.map((item, index) => {
              return <CartItem key={index} item={item} index={index} />;
            })}
            <div className='text-black font-bold'>
              Comments:
              <span className='font-normal text-md mx-1'>{order.comments}</span>
            </div>
            <div>
              <button
                className='bg-green-500 text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
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
                className='bg-red-500 text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
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
