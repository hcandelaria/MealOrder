'use client';
import { useState } from 'react';
import LoadingModal from '../LoadingModal';
import MessageModal from '../MessageModal';

export default function Dashboard() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <h1 className='text-red-500 text-3xl'>Dashboard</h1>
      <h1 className='text-red-500 text-3xl'>{modal.toString()}</h1>
      <button
        className='bg-black text-white font-bold rounded-full px-2 mx-2 my-1 col-span-2'
        onClick={() => {
          toggleModal();
        }}
      >
        Test
      </button>
      {modal && (
        // <LoadingModal message='Please do not refresh. Processing order.' />
        <MessageModal
          tone='neutral'
          message='test'
          toggleFunction={toggleModal}
        />
      )}
    </>
  );
}
