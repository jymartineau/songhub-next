import React from 'react';

const AffiliationPage = () => {
  return (
    <div className='container mx-auto py-16 px-4'>

      <form className='flex items-center flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='relative w-full sm:w-60'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='form-element pl-10'
            placeholder='Search Society'
            required
          />
        </div>

        <select name="" id="" className='form-element sm:w-60'>
          <option value="">SOCAN</option>
        </select>

        <button className='form-element p-3 sm:w-20 flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </form>

    </div>
  );
};

export default AffiliationPage;
