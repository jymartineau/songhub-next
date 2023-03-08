import { Dispatch, Fragment, SetStateAction } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Group from '@/components/Forms/Form/Group'
import { useFormik } from 'formik'
import * as Yup from "yup";
import AudioDropZone from '@/components/MediaUpload/AudioDropZone'

export default function Modal({open, setOpen, handleAdd}:{open:boolean, setOpen: Dispatch<SetStateAction<boolean>>, handleAdd:() => void}) {

  const formik = useFormik(
    {
      initialValues: {
       title:"",
       audio:"",
       desc:"",
       fileURL:"",
       file:undefined,
       created:"",
       daw:""
      },
      onSubmit: (v) => {
        console.log(v)
        handleAdd()
      },
      validationSchema: Yup.object().shape({title: Yup.string().required('Title is required').max(50, 'Max title length is 50'),})
    }
  )
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
           
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 pb-4 text-left shadow-xl transition-all w-[95%] sm:my-8 sm:w-full sm:max-w-sm md:min-w-[500px] ">
               <div className='flex bg-gray-700 p-3 px-4'> 
               <div className='cursor-pointer rounded-full border border-gray-800 bg-gray-900 hover:bg-gray-800 h-fit w-fit p-1' onClick={() => setOpen(false)}>
                    <ArrowLeftIcon className='h-6 w-6' /> 
               </div>
                <div className='flex flex-1 grow-1 items-center justify-center h-7'>
                    <p className='text-center align-middle text-xl'>Stem Upload</p> 
                </div>
                 </div>
               <div>

            {/* Body */}
            <div className='p-2'>
              <Group title='select a file'>

               <AudioDropZone setFieldValue={formik.setFieldValue} existingFile={formik.values.file} cleanup={false}/>
              </Group>

              <hr className=" py-1" />

              <Group title='title'>
                <input
                type='text'
                  name="title"
                  placeholder="Enter a title..."
                  
                />
              </Group>
                <Group title='description'>
                <textarea
                  name="description"
                  placeholder="Enter a description..."
                  className='px-2'
                />
              </Group>
              <Group title='daw'>
                <input type='text' placeholder='daw used...'  {...formik.getFieldProps("daw")}/>
              </Group>
            </div>

            <div className='w-full flex items-center justify-center px-2'>
              <button
                type="button"
                className="uppercase w-full bg-gray-600 py-2 rounded-lg"
              >
                <p className='text-center'>Upload</p>
              </button>
            </div>
          </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}