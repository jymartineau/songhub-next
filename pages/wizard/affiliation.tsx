import { Society } from '@/types/Society';
import { fetcher } from '@/utils';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';

interface SocietyComboBoxProps {
  defaultGroup: string;
  items: Society[];
  // eslint-disable-next-line no-unused-vars
  onSocietyChange: (value: string) => void;
}
const SocietyComboBox = ({
  defaultGroup,
  items,
  onSocietyChange: onGroupChange,
}: SocietyComboBoxProps) => {
  const [query, setQuery] = useState('');
  const filteredGroups =
    query === ''
      ? items
      : items.filter((society) =>
          society.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  const [selectedGroup, setSelectedGroup] = useState(defaultGroup);
  useEffect(() => {
    onGroupChange(selectedGroup);
  }, [onGroupChange, selectedGroup]);

  return (
    <Combobox value={selectedGroup} onChange={setSelectedGroup}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            className='form-element w-full border-none text-sm leading-5 text-gray-900 focus:ring-0'
            // displayValue={(group) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredGroups.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                No match found.
              </div>
            ) : (
              filteredGroups
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((society) => (
                  <Combobox.Option
                    key={society._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={society.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {society.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

const AffiliationPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>([]);
  const { data: groups } = useSWR<string[]>('/api/societies/groups', fetcher);
  const { data: societies } = useSWR<Society[]>('/api/societies', fetcher);
  useEffect(() => {
    if (groups !== undefined) {
      setSelectedGroup(groups[0]);
    }
  }, [groups]);
  
  useEffect(() => {
    if (societies && selectedGroup !== undefined) {
      const filteredSoc = societies.filter(
        (society) => society.group === selectedGroup
      );
      setFilteredSocieties(filteredSoc);
    }
  }, [selectedGroup, societies]);

  return (
    <div className='container mx-auto py-16 px-4 min-h-screen'>
      <form className='flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='relative w-full sm:w-60'>
          <SocietyComboBox
            defaultGroup={selectedGroup ?? ''}
            items={filteredSocieties ?? []}
            onSocietyChange={() => {} } // setFieldValue('group', value.toUpperCase())
          />
        </div>

        <select
          name=''
          id=''
          className='form-element sm:w-60'
          defaultValue={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value) }
        >
          {groups &&
            groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
        </select>

        <button className='form-element flex justify-center p-3 sm:w-20'>
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
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AffiliationPage;
