import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import React, { Fragment, useEffect, useState } from 'react';

interface GroupComboBoxProps {
  defaultGroup: string;
  items: string[];
  // eslint-disable-next-line no-unused-vars
  onGroupChange: (value: string) => void;
}
const GroupComboBox = ({ defaultGroup, items, onGroupChange }: GroupComboBoxProps) => {
  const [query, setQuery] = useState('');
  const filteredGroups =
    query === ''
      ? items
      : items.filter((group) =>
          group
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  const [selectedGroup, setSelectedGroup] = useState(defaultGroup);
  useEffect(() => {
    onGroupChange(selectedGroup);
  }, [selectedGroup]);

  return (
    <Combobox value={selectedGroup} onChange={setSelectedGroup}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
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
                .sort((a, b) => a.localeCompare(b))
                .map((group) => (
                  <Combobox.Option
                    key={group}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={group}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {group}
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
            {query.length > 0 && (
              <Combobox.Option value={query}>
                <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  Use &quot;{query})&quot;
                </div>
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default GroupComboBox;
