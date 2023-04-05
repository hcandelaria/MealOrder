'use client';
import { useEffect, useState } from 'react';
import CartItem from '../CartItem';
import { useItem } from '../Context/ItemContext';
import { useShoppingCart } from '../Context/ShoppingCartContext';
import { SubmitOrder } from '../lib/api';
import LoadingModal from '../LoadingModal';
import MessageModal from '../MessageModal';

export default function ShoppingCart() {
  const { items, clearItems } = useShoppingCart();
  const { serviceDate } = useItem();
  const [modal, setModal] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const updateCartTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setCartTotal(total);
  };

  useEffect(() => {
    updateCartTotal();
  }, []);

  return (
    <>
      {isLoading && <LoadingModal />}
      {modal && (
        <MessageModal
          tone='successful'
          message='Order Submitted Successfuly! We will call you to confirm order.'
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
                    onClick={() => {
                      setLoading(true);
                      const payload = {
                        customer_name: 'John Smith',
                        customer_phone: '1234567890',
                        items: items,
                        service_date: serviceDate,
                        comments: 'Test',
                      };
                      SubmitOrder(payload).then((res: any) => {
                        setLoading(false);
                        toggleModal();
                        clearItems();
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
