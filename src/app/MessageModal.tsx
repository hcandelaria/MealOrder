import {
  CheckIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

export default function MessageModal({
  message,
  toggleFunction,
  tone,
  callBack,
}: {
  tone: 'successful' | 'fail' | 'neutral';
  message: string;
  toggleFunction: () => void;
  callBack?: () => void;
}) {
  return (
    <>
      <div className='overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 inset-0 z-50 justify-center items-center'>
        <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
          <div className='mt-3 text-center'>
            {tone === 'successful' && (
              <>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
                  <span className='animate-ping absolute inline-flex h-10 w-10 rounded-full bg-green-600 opacity-75'></span>
                  <CheckIcon className='h-6 w-6 fill-green-600' />
                </div>
                <div className='mt-2 px-7 py-3'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Successful!
                  </h3>
                  <p className='text-sm text-gray-500'>{message}</p>
                </div>
                <div className='items-center px-4 py-3'>
                  <button
                    onClick={() => {
                      toggleFunction();
                    }}
                    id='ok-btn'
                    className='px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
                  >
                    OK
                  </button>
                </div>
              </>
            )}
            {tone === 'fail' && (
              <>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                  <XMarkIcon className='h-6 w-6 fill-red-600' />
                </div>
                <div className='mt-2 px-7 py-3'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Error!
                  </h3>
                  <p className='text-sm text-gray-500'>{message}</p>
                </div>
                <div className='items-center px-4 py-3'>
                  <button
                    onClick={() => {
                      toggleFunction();
                    }}
                    id='ok-btn'
                    className='px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300'
                  >
                    OK
                  </button>
                </div>
              </>
            )}
            {tone === 'neutral' && (
              <>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100'>
                  <QuestionMarkCircleIcon className='h-6 w-6' />
                </div>
                <div className='mt-2 px-7 py-3'>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Save Changes
                  </h3>
                  <p className='text-sm text-gray-500'>{message}</p>
                </div>
                <div className='items-center px-4 py-3'>
                  <button
                    onClick={() => {
                      toggleFunction();
                    }}
                    id='ok-btn'
                    className='px-4 py-2 mx-10 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toggleFunction();
                    }}
                    id='ok-btn'
                    className='px-4 py-2 mx-10 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
