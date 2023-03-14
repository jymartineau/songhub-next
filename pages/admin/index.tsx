import Link from 'next/link';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const AdminHome = () => {
  return (
    <div className='wrapper'>
      <ul className=''>
        <li className=''>
          <Link href='/admin/manage' className=''>
            &raquo; Specialty, Category and Society
          </Link>
        </li>
        <li className=''></li>
      </ul>
    </div>
  );
};

export default AdminHome;

export const getServerSideProps = withPageAuthRequired  ();

