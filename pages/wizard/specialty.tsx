import React from 'react';
import useSWR from 'swr';
import { Specialty } from '@/types/Specialty';
import { fetcher } from '@/utils';
import { Category } from '@/types/Category';
import { MoonLoader } from 'react-spinners';

interface CheckboxGroupProps {
  children: React.ReactNode;
  label: string;
}
export const CheckboxGroup = ({ children, label }: CheckboxGroupProps) => {
  return (
    <div
      role='checkboxgroup'
      className='checkbox-group flex flex-col space-y-4'
      aria-labelledby='group_heading'
    >
      <h2 id='group_heading' className='uppercase'>
        {label}
      </h2>
      {children}
    </div>
  );
};

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
export const Checkbox = ({
  id,
  name,
  label,
  description,
  icon,
  onChange,
}: CheckboxProps) => {
  return (
    <div className='relative flex rounded border'>
      <div className='flex items-center justify-center bg-gray-300 p-4'>
        {icon}
      </div>
      <input
        type='checkbox'
        id={id}
        name={name}
        className='absolute top-2 right-2'
        onChange={onChange}
      />
      <label className='checkbox-label' htmlFor={id}>
        <div className='flex w-60 cursor-pointer flex-col p-4'>
          <h3 className='font-bold'>{label}</h3>
          <p className=''>{description}</p>
        </div>
      </label>
    </div>
  );
};

const SpecialtyPage = () => {
  const { data: specialties, isLoading: isLoadingSpecialties } = useSWR<
    Specialty[]
  >('/api/specialties', fetcher);
  const { data: categories, isLoading: isLoadingCategories } = useSWR<
    Category[]
  >('/api/categories', fetcher);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleCheckboxChange', e.target.name, e.target.checked);
  };
  const defaultIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='h-6 w-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
      />
    </svg>
  );
  return (
    <div className='wrapper'>
      <div className='flex flex-col space-y-8 sm:flex-row sm:space-y-0 sm:space-x-20'>
        {isLoadingSpecialties ? (
          <MoonLoader loading={true} size={20} />
        ) : (
          <CheckboxGroup label="What's your specialty?">
            {specialties &&
              specialties.map((specialty) => (
                <Checkbox
                  key={specialty._id}
                  id={specialty._id}
                  name={specialty._id}
                  label={specialty.name}
                  description={specialty.description}
                  icon={defaultIcon}
                  onChange={handleCheckboxChange}
                />
              ))}
          </CheckboxGroup>
        )}

        {isLoadingCategories ? (
          <MoonLoader size={20} />
        ) : (
          <CheckboxGroup label='What categories do you work in?'>
            {categories &&
              categories.map((category) => (
                <Checkbox
                  key={category._id}
                  id={category._id}
                  name={category._id}
                  label={category.name}
                  description={category.description}
                  icon={defaultIcon}
                  onChange={handleCheckboxChange}
                />
              ))}
          </CheckboxGroup>
        )}
      </div>

      <div className='flex w-full justify-end'>
        <button className='mt-6 bg-gray-300 px-4 py-2 uppercase'>Finish</button>
      </div>
    </div>
  );
};

export default SpecialtyPage;
