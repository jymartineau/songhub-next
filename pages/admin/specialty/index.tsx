import ModalNames from '@/components/modals/modalNames';
import { useRootStore } from '@/providers/RootStoreProvider';
import React from 'react';

const SpecialtyAdminPage = () => {
  const { openModal } = useRootStore();

  const handleCreateSpecialtyClick = () => {
    console.log('handleCreateSpecialtyClick');
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY);
  }
  const handleEditSpecialtyClick = () => {
    console.log('handleEditSpecialtyClick');
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY, {specialty: {}});
  }
  const handleDeleteSpecialtyClick = (specialty: any) => {
    console.log('handleDeleteSpecialtyClick');
    if (confirm(`Delete specialty: ${specialty.name}`)) {
      console.log('Specialty deleted!');
    }
  }
  return (
    <div className='wrapper flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
      <div className='flex-1'>
        <div className='flex items-center justify-between bg-gray-100 p-2'>
          <h2 className='text-xl'>All specialties</h2>
          <button className='btn-primary' onClick={handleCreateSpecialtyClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 4.5v15m7.5-7.5h-15'
              />
            </svg>
          </button>
        </div>
        <table className='min-w-full text-left text-sm font-light'>
          <tbody>
            <tr className='border-b dark:border-neutral-500'>
              <td className='flex items-start whitespace-nowrap px-6 py-4 font-semibold'>
                SongWriter
              </td>
              <td className='flex-wrap px-6 py-4'>
                <p>
                  Ut ut nisl vel sapien hendrerit consectetur at vel odio.
                </p>
              </td>
              <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                <button className='' onClick={handleEditSpecialtyClick}>Edit</button>
                <button className='' onClick={() => handleDeleteSpecialtyClick({})}>Delete</button>
              </td>
            </tr>
            <tr className='border-b dark:border-neutral-500'>
              <td className='whitespace-nowrap px-6 py-4 font-semibold'>
                Composer
              </td>
              <td className='flex-wrap px-6 py-4'>
                <p>Nam ut ullamcorper elit. </p>
              </td>
              <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                <button className=''>Edit</button>
                <button className=''>Delete</button>
              </td>
            </tr>
            <tr className='border-b dark:border-neutral-500'>
              <td className='whitespace-nowrap px-6 py-4 font-semibold'>
                Mastering
              </td>
              <td className='flex-wrap px-6 py-4'>
                <p className="">Phasellus erat enim, tincidunt eget ante id, rhoncus volutpat urna. </p>
              </td>
              <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                <button className=''>Edit</button>
                <button className=''>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* instruments */}
      <div className='flex-1 border'>instruments</div>
    </div>
  );
};

export default SpecialtyAdminPage;
