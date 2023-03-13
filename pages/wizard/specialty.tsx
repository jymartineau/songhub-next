import React from 'react';

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
      <h2 id='group_heading' className='uppercase'>{label}</h2>
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
export const Checkbox = ({ id, name, label, description, icon, onChange }: CheckboxProps) => {
  return (
    <div className='relative flex border rounded'>
      <div className='bg-gray-300 p-4 flex items-center justify-center'>{icon}</div>
      <input
        type='checkbox'
        id={id}
        name={name}
        className='absolute top-2 right-2'
        onChange={onChange}
      />
      <label className='checkbox-label' htmlFor={id}>
        <div className='w-60 flex flex-col p-4 cursor-pointer'>
          <h3 className='font-bold'>{label}</h3>
          <p className=''>{description}</p>
        </div>
      </label>
    </div>
  );
};

const SpecialtyPage = () => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleCheckboxChange', e.target.name, e.target.checked);
  }
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
      <div className='flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-20'>
        <CheckboxGroup label="What's your specialty?">
          <Checkbox
            id='song-writer'
            name='specialty'
            label='SongWriter'
            description='song writer description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />

          <Checkbox
            id='composer'
            name='specialty'
            label='Composer'
            description='composer description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />

          <Checkbox 
            id='mastering'
            name='specialty'
            label='Mastering'
            description='composer description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />
        </CheckboxGroup>

        <CheckboxGroup label="What categories do you work in?">
          <Checkbox
            id='filmTv'
            name='categories'
            label='Film/Tv'
            description='Film / TV description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />

          <Checkbox
            id='adsTrailer'
            name='categories'
            label='Ads & Trailers'
            description='Ads & Trailers description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />

          <Checkbox 
            id='rock'
            name='categories'
            label='Rock'
            description='Rock description'
            icon={defaultIcon}
            onChange={handleCheckboxChange}
          />
        </CheckboxGroup>
      </div>

      <div className="w-full flex justify-end">
        <button className="uppercase px-4 py-2 bg-gray-300 mt-6">Finish</button>
      </div>
    </div>
  );
};

export default SpecialtyPage;
