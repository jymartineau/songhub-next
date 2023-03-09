import Link from 'next/link';
import React from 'react';

const AdminHome = () => {
  return (
    <div className='wrapper'>
      <ul className=''>
        <li className=''>
          <Link href='/admin/manage/entities' className=''>
            &raquo; Specialty, Category and Society
          </Link>
        </li>
        <li className=''></li>
      </ul>
    </div>
  );
};

export default AdminHome;
