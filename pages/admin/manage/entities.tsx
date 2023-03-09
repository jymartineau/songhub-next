import ModalNames from '@/components/modals/modalNames';
import { useRootStore } from '@/providers/RootStoreProvider';
import useSWR, { mutate, useSWRConfig } from 'swr';
import React from 'react';
import { Specialty } from '@/types/Specialty';
import { fetcher } from '@/utils';
import { Category } from '@/types/Category';
import { MoonLoader } from 'react-spinners';
import { Tab } from '@headlessui/react';
import { Society } from '@/types/Society';

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
const SpecialtyCRUD = ({
  target,
  title,
  items,
  onCreate,
  onEdit,
  onDelete,
}: SpecialtyCRUDProps<Specialty>) => {
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
          {items &&
            items.map((item) => (
              <tr key={item._id} className='border-b dark:border-neutral-500'>
                <td className='flex items-start whitespace-nowrap px-6 py-4 font-semibold'>
                  {item.name}
                </td>
                <td className='flex-wrap px-6 py-4'>
                  <p>{item.description}</p>
                </td>
                <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                  <button className='' onClick={() => onEdit(item, target)}>
                    Edit
                  </button>
                  <button className='' onClick={() => onDelete(item, target)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

interface SocietyCRUDProps {
  items: Society[];
}
const SocietyCRUD = ({ items }: SocietyCRUDProps) => {
  const { openModal } = useRootStore();
  const handleCreateSocietyClick = () => {
    openModal(ModalNames.ADMIN_CREATE_EDIT_SOCIETY, {});
  };
  const handleEditSocietyClick = (society: Society) => {
    openModal(ModalNames.ADMIN_CREATE_EDIT_SOCIETY, { society });
  };
  const handleDeleteSocietyClick = async (society: Society) => {
    const { _id: id } = society;
    if (confirm(`Delete society: ${society.name} (${society.group}) ?`)) {
      await fetch(`/api/societies/${id}`, {
        method: 'DELETE',
      }).then(() => {
        mutate(`/api/societies`);
      });
    }
  };
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between bg-gray-100 p-2'>
        <h2 className='text-xl'>All Societies</h2>
        <button className='btn-primary' onClick={handleCreateSocietyClick}>
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
          {items &&
            items.map((society) => (
              <tr
                key={society._id}
                className='border-b dark:border-neutral-500'
              >
                <td className='flex items-start whitespace-nowrap px-6 py-4 font-semibold'>
                  {society.group}
                </td>
                <td className='flex-wrap px-6 py-4'>
                  <p>{society.name}</p>
                </td>
                <td className='flex justify-end space-x-2 whitespace-nowrap px-6 py-4'>
                  <button
                    className=''
                    onClick={() => handleEditSocietyClick(society)}
                  >
                    Edit
                  </button>
                  <button
                    className=''
                    onClick={() => handleDeleteSocietyClick(society)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageEntitiesPage = () => {
  const { openModal } = useRootStore();
  const { mutate } = useSWRConfig();
  const { data: specialties, isLoading } = useSWR<Specialty[]>(
    '/api/specialties',
    fetcher
  );
  const { data: categories, isLoading: isLoadingCateg } = useSWR<Category[]>(
    '/api/categories',
    fetcher
  );
  const { data: societies, isLoading: isLoadingSoc } = useSWR<Society[]>(
    '/api/societies',
    fetcher
  );

  const handleCreateSpecialtyClick = (target: string) => {
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY, { target });
  };
  const handleEditSpecialtyClick = (specialty: Specialty, target: string) => {
    openModal(ModalNames.ADMIN_CREATE_EDIT_SPECIALTY, { specialty, target });
  };
  const handleDeleteSpecialtyClick = async (specialty: any, target: string) => {
    const { _id: id } = specialty;
    if (confirm(`Delete ${target}: ${specialty.name} ?`)) {
      await fetch(
        `/api/${target === 'specialty' ? 'specialties' : 'categories'}/${id}`,
        {
          method: 'DELETE',
        }
      ).then(() => {
        mutate(`/api/${target === 'specialty' ? 'specialties' : 'categories'}`);
      });
    }
  };
  return (
    <div className='wrapper '>
      <Tab.Group>
        <Tab.List className='mb-4 space-x-3 text-xl'>
          <Tab className=''>
            {({ selected }) => (
              <button
                className={`${
                  selected ? 'bg-gray-200' : 'hover:bg-gray-200'
                } rounded-lg py-1 px-2`}
              >
                Specialties
              </button>
            )}
          </Tab>
          <Tab className=''>
            {({ selected }) => (
              <button
                className={`${
                  selected ? 'bg-gray-200' : 'hover:bg-gray-200'
                } rounded-lg py-1 px-2`}
              >
                Categories
              </button>
            )}
          </Tab>
          <Tab className=''>
            {({ selected }) => (
              <button
                className={`${
                  selected ? 'bg-gray-200' : 'hover:bg-gray-200'
                } rounded-lg py-1 px-2`}
              >
                Society
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className=''>
          <Tab.Panel>
            {isLoading ? (
              <MoonLoader size={20} />
            ) : (
              <SpecialtyCRUD
                target='specialty'
                title='All specialties'
                items={specialties}
                onCreate={handleCreateSpecialtyClick}
                onEdit={handleEditSpecialtyClick}
                onDelete={handleDeleteSpecialtyClick}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isLoadingCateg ? (
              <MoonLoader size={20} />
            ) : (
              <SpecialtyCRUD
                target='category'
                title='All categories'
                items={categories}
                onCreate={handleCreateSpecialtyClick}
                onEdit={handleEditSpecialtyClick}
                onDelete={handleDeleteSpecialtyClick}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isLoadingSoc ? (
              <MoonLoader size={20} />
            ) : (
              <SocietyCRUD items={societies ?? []} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ManageEntitiesPage;
