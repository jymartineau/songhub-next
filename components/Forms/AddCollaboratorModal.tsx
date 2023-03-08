import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Group from '@/components/Forms/Form/Group'
import { useFormik } from 'formik'
import { Collaborator, } from '@/types'
import { WRITER_TYPES } from '@/constants'

// eslint-disable-next-line no-unused-vars
export default function Modal({ open, setOpen, handleAdd }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, handleAdd: (writer: Collaborator) => void }) {

  const formik = useFormik(
    {
      initialValues:
      {
        writerName: "",
        writerEmail: "",
        writerAffiliation: "",
        writerType: [],
        publisher: "",
        publisherAffiliation: "",
        territory: "",
        share: 0,
      },

      onSubmit: async (v) => {

        handleAdd(v)
        setOpen(false);


      },
    }
  )

  useEffect(() => {
    console.log(formik.values)
  }, [formik.values])


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 flex justify-center items-center" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center min-w-[320px] justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 pb-4 text-left shadow-xl transition-all w-[95%] sm:my-8 sm:w-full sm:max-w-sm md:min-w-[700px] ">
                <>
                  <div className='flex bg-gray-700 p-3 px-4'>
                    <div className='cursor-pointer rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800 h-fit w-fit p-1' onClick={() => setOpen(false)}>
                      <ArrowLeftIcon className='h-6 w-6' />
                    </div>
                    <div className='flex flex-1 grow-1 items-center justify-center h-7'>
                      <p className='text-center align-middle text-xl'>Add Collaborator</p>
                    </div>
                  </div>
                  <div>

                    {/* Body */}
                    <div className='p-2 flex flex-row gap-2 w-full'>

                      <div className='w-full md:max-w-[33%]'>
                        <Group title='Email'>
                          <input
                            type='text'
                            placeholder="Enter an Email..."
                            {...formik.getFieldProps('writerEmail')}
                          />
                        </Group>
                        <Group title='Collaborator Name'>
                          <input
                            type='text'
                            {...formik.getFieldProps('writerName')}
                            placeholder="Enter a Name..."
                            className='px-2'
                          />
                        </Group>
                        <Group title='Collaborator Affiliation'>
                          <input type='text' placeholder='Collaborator Affiliation...'  {...formik.getFieldProps("writerAffiliation")} />
                        </Group>
                      </div>
                      <div className='w-full md:max-w-[33%]'>

                        <Group title='Publisher'>
                          <input
                            type='text'
                            placeholder="Enter Publisher..."
                            {...formik.getFieldProps('publisher')}
                          />
                        </Group>
                        <Group title='Publisher Affiliation'>
                          <input
                            type='text'
                            {...formik.getFieldProps('publisherAffiliation')}
                            placeholder="Enter a Name..."
                            className='px-2'
                          />
                        </Group>
                        <Group title='territory'>
                          <input {...formik.getFieldProps('territory')} type='text' placeholder='Territory...' />
                        </Group>

                      </div>
                      <div className='w-full md:max-w-[33%] flex flex-col'>
                        <div className='h-full'>
                          <Group title='Collaborator Type'>
                            <div>
                              {WRITER_TYPES.map((c, i) => {
                                return (
                                  <div key={`${c}-${i}`} className='flex flex-row justify-between w-full pr-3 item-center'>
                                    <label className='capitalize w-[76px] text-lg' htmlFor={c}>{c}</label>
                                    <input type='checkbox' className='w-4 h-4 my-auto' value={c} name="writerType" onChange={formik.handleChange} />
                                  </div>
                                )
                              })}
                            </div>
                          </Group>
                        </div>
                        <div className=''>
                          {/* NOTE: should be dropdown */}

                        </div>
                      </div>
                    </div>

                    <div className='w-full flex items-center justify-center px-2'>
                      <button
                        type="button"
                        className="uppercase w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-700"
                        onClick={() => {
                          formik.handleSubmit()
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}