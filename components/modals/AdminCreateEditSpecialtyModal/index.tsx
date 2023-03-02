import { useRootStore } from '@/providers/RootStoreProvider';
import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react';
import { MoonLoader } from 'react-spinners';
import * as Yup from 'yup';
import Modal from '../Modal';

const AdminCreateEditSpecialtyModal = () => {
  const { modalProps, closeModal } = useRootStore();
  const specialty: any = modalProps.specialty;
  const initialValues = {
    name: '',
    description: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });
  async function onSubmit(fields: any) {
    console.log('fields', fields);
    closeModal();
  }
  return (
    <Modal>
      <section className='h-[640px] w-[1080px] divide-y overflow-y-scroll'>
        <h2 className='text-2xl font-bold'>
          {specialty ? 'Edit' : 'Create'} specialty
        </h2>
        <hr />
        <Formik
          initialValues={specialty ?? initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit} className='pt-4'>
                <div className='flex w-full items-center space-x-4 py-2'>
                  <label htmlFor='name' className='w-60 text-right font-bold'>
                    Name
                  </label>
                  <div className='flex w-full flex-1 flex-col'>
                    <Field
                      name='name'
                      type='text'
                      className='w-full rounded border p-1'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-red-400'
                    />
                  </div>
                </div>
                <div className='flex w-full items-center space-x-4 py-2'>
                  <label htmlFor='description' className='w-60 text-right font-bold'>
                    Description
                  </label>
                  <div className='flex w-full flex-1 flex-col'>
                    <Field
                      name='description'
                      as='textarea'
                      rows='5'
                      className='w-full rounded border p-1'
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='text-red-400'
                    />
                  </div>
                </div>
                <div className="flex justify-center py-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex items-center justify-center space-x-4 w-40"
                    >
                      <span>{specialty ? 'Save' : 'Create'}</span>
                      {isSubmitting && <MoonLoader color={'#fff'} loading={true} size={20} />}
                    </button>
                  </div>
              </form>
            );
          }}
        </Formik>
      </section>
    </Modal>
  );
};

export default AdminCreateEditSpecialtyModal;
