import { useRootStore } from '@/providers/RootStoreProvider';
import { fetcher } from '@/utils';
import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import useSWR from 'swr';
import Modal from '../Modal';
import GroupComboBox from './GroupComboBox';

export const getSocietyValidationSchema = () => {
  return Yup.object().shape({
    id: Yup.string(),
    group: Yup.string().required('Group is required'),
    name: Yup.string().required('Name is required'),
  });
};

const AdminCreateEditSocietyModal = () => {
  const { mutate } = useSWRConfig();
  const { modalProps, closeModal } = useRootStore();
  const { data, isLoading } = useSWR<string[]>(
    '/api/societies/groups',
    fetcher
  );

  const society: any = modalProps.society;
  const initialValues = {
    id: undefined,
    group: '',
    name: '',
  };

  const validationSchema = getSocietyValidationSchema();
  async function onSubmit(fields: any) {
    const { _id } = fields;
    let method, url;
    if (_id === undefined) {
      url = `/api/societies`;
      method = 'POST';
    } else {
      url = `/api/societies/${_id}`;
      method = 'PUT';
    }

    await fetch(url, {
      method: method,
      body: JSON.stringify(fields),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    mutate(`/api/societies`);
    closeModal();
  }
  return (
    <Modal>
      <section className='h-[640px] w-[360px] divide-y overflow-y-scroll md:w-[640px] xl:w-[1080px]'>
        <h2 className='text-2xl font-bold'>
          {society ? 'Edit' : 'Create'} Society
        </h2>
        <hr />
        <Formik
          initialValues={society ?? initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnBlur
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit} className='pt-4'>
                <div className='flex w-full flex-col items-center py-2 lg:flex-row lg:space-x-4'>
                  <label className='hidden w-60 text-right font-bold lg:block'>
                    Group
                  </label>
                  <div className='flex flex-col'>
                    {isLoading ? (
                      <MoonLoader />
                    ) : (
                      <>
                        <GroupComboBox
                        defaultGroup={society ? society.group : ''}
                          items={data ?? []}
                          onGroupChange={(value) =>
                            setFieldValue('group', value.toUpperCase())
                          }
                        />
                        <ErrorMessage
                          name='group'
                          component='div'
                          className='text-red-400'
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className='flex w-full flex-col items-center py-2 lg:flex-row lg:space-x-4'>
                  <label
                    htmlFor='name'
                    className='hidden w-60 text-right font-bold lg:block'
                  >
                    Name
                  </label>
                  <div className='flex w-full flex-1 flex-col'>
                    <Field
                      name='name'
                      type='text'
                      className='rounded border p-1'
                      placeholder='Name'
                    />
                    <ErrorMessage
                      name='name'
                      component='div'
                      className='text-red-400'
                    />
                  </div>
                </div>
                <div className='flex justify-center py-2'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn-primary flex w-40 items-center justify-center space-x-4'
                  >
                    <span>{society ? 'Save' : 'Create'}</span>
                    {isSubmitting && (
                      <MoonLoader color={'#fff'} loading={true} size={20} />
                    )}
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

export default AdminCreateEditSocietyModal;
