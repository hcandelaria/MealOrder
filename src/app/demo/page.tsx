'use client';
import { useState } from 'react';
import LoadingModal from '../LoadingModal';
import MessageModal from '../MessageModal';

export default function Demo() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <h1 className='text-red-500 text-3xl'>Demo</h1>
      <h1 className='text-red-500 text-3xl'>{modal.toString()}</h1>
      <button
        className='rounded-full px-2 mx-2 my-1 col-span-2 border-2 border-black bg-white text-black dark:bg-red-500 dark:text-black'
        onClick={() => {
          toggleModal();
        }}
      >
        Test
      </button>
      {modal && (
        <LoadingModal />
        // <MessageModal
        //   tone='neutral'
        //   message='successful'
        //   toggleFunction={toggleModal}
        // />
      )}
    </>
  );
}
