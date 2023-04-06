'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartItem from '../CartItem';
import { useItem } from '../Context/ItemContext';
import { useShoppingCart } from '../Context/ShoppingCartContext';
import { SubmitOrder } from '../lib/api';
import LoadingModal from '../LoadingModal';
import MessageModal from '../MessageModal';

export default function ShoppingCart() {
  const { items, clearItems } = useShoppingCart();
  const { serviceDate } = useItem();
  const [tone, setTone] = useState<'neutral' | 'successful' | 'fail'>(
    'neutral'
  );
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      {modal && (
        <MessageModal
          tone={tone}
          message={message}
          toggleFunction={toggleModal}
        />
      )}
      {items.length === 0 ? (
        <>Cart is Empty</>
      ) : (
        <>
          <h1 className='text-red-500 text-xl bg-black uppercase'>
            Order Details:
          </h1>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='inline-full-name'
              >
                Order date:{serviceDate}
              </label>
              <label
                className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='inline-full-name'
              >
                Total: $
                {items.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.price,
                  0
                )}
              </label>
            </div>
          </div>
          {items.map((item, index) => {
            return (
              <CartItem
                key={index}
                index={index}
                name={item.name}
                description={item.description}
              />
            );
          })}
          <br />
          <div className='max-w-md rounded-lg bg-white p-6'>
            <form className='w-full max-w-sm'>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label
                    className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                    htmlFor='inline-full-name'
                  >
                    Name
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='inline-full-name'
                    type='text'
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label
                    className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                    htmlFor='inline-phone'
                  >
                    Phone Number
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='inline-phone'
                    type='text'
                  />
                </div>
              </div>
              <div className='md:flex md:items-center mb-6'>
                <div className='md:w-1/3'>
                  <label
                    className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                    htmlFor='inline-phone'
                  >
                    Comments
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500'
                    id='inline-phone'
                    type='text'
                  />
                </div>
              </div>

              <div className='md:flex md:items-center'>
                <div className='md:w-1/3'></div>
                <div className='md:w-2/3'>
                  <button
                    className='bg-black uppercase text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
                    onClick={(e) => {
                      e.preventDefault();
                      setLoading(true);
                      const payload = {
                        shopping_cart_id: uuidv4(),
                        customer_name: 'John Smith',
                        customer_phone: '1234567890',
                        items: items,
                        service_date: serviceDate,
                        comments: 'Test',
                      };
                      SubmitOrder(payload).then((res: any) => {
                        if (res) {
                          setTone('successful');
                          setMessage(
                            'Order Submitted Successfuly! We will call you to confirm order.'
                          );
                          clearItems();
                        } else {
                          setTone('fail');
                          setMessage(
                            'Ops... We are having technical difficulties. Please contact the store directly.'
                          );
                        }
                        setLoading(false);
                        toggleModal();
                      });
                    }}
                  >
                    Place Your Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
