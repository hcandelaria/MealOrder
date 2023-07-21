'use client';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CartItem from '../CartItem';
import { useItem } from '../Context/ItemContext';
import { useShoppingCart } from '../Context/ShoppingCartContext';
import { SubmitOrder } from '../lib/api';
import { formatPhoneNumber, formatRawPhoneNumber } from '../lib/format';
import LoadingModal from '../LoadingModal';
import MessageModal from '../MessageModal';
import AvailableDates from '../order/AvailableDates';

export default function ShoppingCart() {
  const { items, clearItems } = useShoppingCart();
  const { service_date, setServiceDate } = useItem();
  const [tone, setTone] = useState<'neutral' | 'successful' | 'fail'>(
    'neutral'
  );
  const [customerName, setCustomerName] = useState<string>();
  const [rawPhoneNumber, setRawPhoneNumber] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerComments, setCustomerComments] = useState('');
  const [message, setMessage] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | boolean>();

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleCustomerName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCustomerName(e.target.value);
  };
  const handleCustomerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRawPhoneNumber(formatRawPhoneNumber(e.target.value));
    setCustomerPhone(formatPhoneNumber(e.target.value));
  };

  const handleCustomerComment = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCustomerComments(e.target.value);
  };

  const handleSubmitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    if (
      !service_date ||
      customerName === '' ||
      rawPhoneNumber === '' ||
      rawPhoneNumber.length < 10
    ) {
      setLoading(false);
      setError(true);
      return;
    }
    if (error) {
      setError(null);
    }
    const ID = uuidv4();
    const STATUS = 'Pending';

    const ITEMS_PAYLOAD = items.map((item, index) => {
      item.PK = `ORG#1#ORDER#${ID}#ORDERITEM#${index}`;
      item.SK = `DATE#${service_date}#ORDER#${ID}#PRODUCT#${item.SK}`;
      item.GSI1PK = `ORG#1`;
      item.GSI1SK = `DATE#${service_date}#ORDER#${ID}#ITEM#${index}`;
      return marshall(item);
    });

    const ORDER_PAYLOAD = {
      PK: `ORG#1#ORDER#${ID}`,
      SK: `DATE#${service_date}#STATUS#${STATUS}`,
      GSI1PK: `ORG#1`,
      GSI1SK: `DATE#${service_date}#STATUS#${STATUS}#ORDER#${ID}`,
      Data: {
        Customer_Name: customerName,
        Customer_Phone: rawPhoneNumber,
        Service_Date: service_date,
        Customer_Comments: customerComments,
      },
    };
    const PAYLOAD = [marshall(ORDER_PAYLOAD), ...ITEMS_PAYLOAD];
    console.log(PAYLOAD);
    SubmitOrder(PAYLOAD).then((res: any) => {
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
        <>
          <div className='mx-2 '>
            <div className='grid md:flex'>
              <Link
                href='/order'
                className='rounded-lg uppercase w-96 m-2 px-3 py-2 text-center border-2  align-middle border-black bg-white dark:border-white dark:bg-red-500 dark:text-white font-medium dark:hover:bg-white/5 dark:hover:text-red-900 md:w-[50%]'
              >
                Order Now
              </Link>
              <Link
                href='/menu'
                className='rounded-lg uppercase w-96 m-2 px-3 py-2 text-center border-2  align-middle border-black bg-white dark:border-white dark:bg-red-500 dark:text-white font-medium dark:hover:bg-white/5 dark:hover:text-red-900 md:w-[50%]'
              >
                Menu
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className='text-xl text-red-500 uppercase bg-black'>
            Order Details:
          </h1>
          {!service_date && <AvailableDates />}
          <div className='flex mb-6 md:items-center'>
            <div className='w-1/3'>
              {service_date && (
                <div className='flex mb-1 font-bold text-black item-center md:text-rightmd:mb-0 md:block dark:text-white'>
                  <h1 className='text-lg text-bold'>
                    Pick up: {service_date}
                    <Icon
                      icon='ph:x-circle'
                      className='inline-block w-6 mx-1 text-red-500 bg-black border-red-500 border-solid rounded-full hover:fill-red-800 md:my-1'
                      onClick={(e) => {
                        e.preventDefault();
                        setServiceDate('');
                      }}
                    />
                  </h1>
                </div>
              )}
              <label className='block pr-4 mb-1 font-bold text-black md:text-right md:mb-0 dark:text-white'>
                Total: $
                {items.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.Data.Price,
                  0
                )}
              </label>
            </div>
          </div>
          {items.map((item, index) => {
            return (
              <CartItem
                key={item.PK + '#' + item.SK}
                index={index}
                item={item}
              />
            );
          })}
          <br />
          <div className='max-w-md p-6 m-auto bg-white rounded-lg dark:bg-slate-900 dark:text-white'>
            <form className='w-full max-w-sm' onSubmit={handleSubmitOrder}>
              <div className='mb-6 md:flex md:items-center'>
                <div className='md:w-1/3'>
                  <label
                    className='block pr-4 mb-1 font-bold text-black md:mb-0 md:text-right dark:text-white'
                    htmlFor='order-name'
                  >
                    Name
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500 dark:focus:border-red-500'
                    id='order-name'
                    type='text'
                    onChange={handleCustomerName}
                  />
                  <label
                    className='block pr-4 mb-1 italic font-bold text-rose-500 md:mb-0'
                    htmlFor='order-name'
                  >
                    {!customerName && error && 'Enter your name.'}
                  </label>
                </div>
              </div>
              <div className='mb-6 md:flex md:items-center'>
                <div className='md:w-1/3'>
                  <label
                    className='block pr-4 mb-1 font-bold text-black md:mb-0 md:text-right dark:text-white'
                    htmlFor='order-phone'
                  >
                    Phone Number
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500 dark:focus:border-red-500'
                    id='order-phone'
                    type='tel'
                    // pattern='\([0-9]{3}\)[0-9]{3}-[0-9]{4}'
                    value={customerPhone}
                    onChange={handleCustomerPhone}
                  />
                  <label
                    className='block pr-4 mb-1 italic font-bold text-rose-500 md:mb-0'
                    htmlFor='order-phone'
                  >
                    <>
                      {error && (
                        <>
                          {!rawPhoneNumber &&
                            'Enter your contact phone number.'}
                          {rawPhoneNumber.length < 10 &&
                            rawPhoneNumber &&
                            'Enter a valid phone number.'}
                        </>
                      )}
                    </>
                  </label>
                </div>
              </div>
              <div className='mb-6 md:flex md:items-center'>
                <div className='md:w-1/3'>
                  <label
                    className='block pr-4 mb-1 font-bold text-black md:mb-0 md:text-right dark:text-white'
                    htmlFor='inline-comment'
                  >
                    Comments
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input
                    className='w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500 dark:focus:border-red-500'
                    id='inline-comment'
                    type='text'
                    onChange={handleCustomerComment}
                  />
                </div>
              </div>

              <div className='md:flex md:items-center'>
                <div className='md:w-1/3'></div>
                <div className='md:w-2/3'>
                  <label className='block pr-4 mb-1 italic font-bold text-rose-500 md:mb-0'>
                    {!service_date && error && 'Select a pick up date.'}
                  </label>
                  <div className='flex flex-col items-center justify-center '>
                    <button
                      type='submit'
                      className='rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase  shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  bg-red-500 text-white dark:text-black shadow-red-500/20 hover:shadow-red-500/40'
                    >
                      Place Your Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
