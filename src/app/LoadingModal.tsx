export default function LoadingModal({
  message = 'Loading',
}: {
  message?: string;
}) {
  return (
    <>
      <div className='overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 inset-0 z-50 justify-center items-center'>
        <div className='relative top-20 mx-auto p-5 border w-80 shadow-lg rounded-md bg-white dark:bg-gray-900 dark:border-gray-800'>
          <div className='mt-3 text-center'>
            <div className='mx-auto flex items-center justify-center h-12 w-12 '>
              <span className='flex items-center rounded-lg  px-4 py-2 text-red-500'>
                <svg
                  className='mr-3 h-5 w-5 animate-spin text-red-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </span>
            </div>
            <p className='text-sm text-black dark:text-white'>{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}
