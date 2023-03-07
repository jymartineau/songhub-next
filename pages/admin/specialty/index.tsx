import ModalNames from '@/components/modals/modalNames';
import { useRootStore } from '@/providers/RootStoreProvider';
import useSWR, { useSWRConfig } from 'swr';
import React from 'react';
import { Specialty } from '@/types/Specialty';
import { fetcher } from '@/utils';
import { Category } from '@/types/Category';
import { MoonLoader } from 'react-spinners';

type SpecialtyCategoryType = 'specialty' | 'category';
interface SpecialtyCRUDProps<T> {
  title: string;
  target: SpecialtyCategoryType;
  items: T[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onCreate: (target: SpecialtyCategoryType) => void;
  // eslint-disable-next-line no-unused-vars
  onEdit: (item: T, target: SpecialtyCategoryType) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (item: T, target: SpecialtyCategoryType) => void;
}
const SpecialtyCRUD = ({target, title, items, onCreate, onEdit, onDelete}: SpecialtyCRUDProps<Specialty>) => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between bg-gray-100 p-2'>
          <h2 className='text-xl'>{title}</h2>
          <button className='btn-primary' onClick={() => onCreate(target)}>
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
            {items && items.map(item => (
              <tr key={item._id} className='border-b dark:border-neutral-500'>
                <td className='flex items-start whitespace-nowrap px-6 py-4 font-semibold'>
                  {item.name}
                </td>
                <td className='flex-wrap px-6 py-4'>
                  <p>
                    {item.description}
                  </p>
                </td>
                <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                  <button className='' onClick={() => onEdit(item, target)}>Edit</button>
                  <button className='' onClick={() => onDelete(item, target)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

const SpecialtyAdminPage = () => {
  const { openModal } = useRootStore();
  const { mutate } = useSWRConfig();
  const { data: specialties, isLoading } = useSWR<Specialty[]>('/api/specialties', fetcher);
  const { data: categories, isLoading: isLoadingCateg } = useSWR<Category[]>('/api/categories', fetcher);

  const handleCreateSpecialtyClick = (target: string) => {
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY, {target});
  }
  const handleEditSpecialtyClick = (specialty: Specialty, target: string) => {
    console.log('handleEditSpecialtyClick');
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY, {specialty, target});
  }
  const handleDeleteSpecialtyClick = async (specialty: any, target: string) => {
    const {_id: id } = specialty;
    if (confirm(`Delete ${target}: ${specialty.name} ?`)) {
      await fetch(`/api/${target === 'specialty' ? 'specialties' : 'categories'}/${id}`, {
        method: 'DELETE'
      }).then(() => {
        mutate(`/api/${target === 'specialty' ? 'specialties' : 'categories'}`);
      })
    }
  }
  return (
    <div className='wrapper flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8'>
      
      <div className='flex-1 border'>
        {isLoading ? <MoonLoader size={20} /> : <SpecialtyCRUD 
          target='specialty'
          title="All specialties"
          items={specialties}
          onCreate={handleCreateSpecialtyClick}
          onEdit={handleEditSpecialtyClick}
          onDelete={handleDeleteSpecialtyClick}
        />}
      </div>
      <div className='flex-1 border'>
      {isLoadingCateg ? <MoonLoader size={20} /> : <SpecialtyCRUD 
          target='category'
          title="All categories"
          items={categories}
          onCreate={handleCreateSpecialtyClick}
          onEdit={handleEditSpecialtyClick}
          onDelete={handleDeleteSpecialtyClick}
        />}
      </div>
    </div>
  );
};

export default SpecialtyAdminPage;
