import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-3 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600'>
      <div className='container mx-auto flex w-full flex-wrap items-center justify-between px-6'>
        <div>
          <Link
            className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'
            href='/'
          >
            SongHub
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-black">Joe Berman</div>
          <button className="flex p-2 rounded-full bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
