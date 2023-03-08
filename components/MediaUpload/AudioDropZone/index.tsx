/* eslint-disable no-unused-vars */
import { UploadedFile } from '@/types';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { FormikErrors } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AudioPlayer from 'react-h5-audio-player';

export default function MediaUpload({
  setFieldValue,
  existingFile,
  cleanup = true,
}: {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<any>>;
  cleanup?: boolean;
  existingFile: UploadedFile | undefined;
}) {
  const [file, setFile] = useState<UploadedFile>();
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    accept: {
      'audio/*': [],

    },

    onDrop: (acceptedFiles) => {
      setFieldValue('file', acceptedFiles[0]);
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  useEffect(() => {
    return () => {
      if (file && cleanup) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file, cleanup]);

  useEffect(() => {
    if (existingFile) {
      setFile(existingFile);
    }
  }, [existingFile]);
  const removeMedia = () => {
    setFile(undefined);
  };
  return (
    <section>
      {!file && (
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="border-dashed border-2 border-gray-600 px-2 py-2 bg-opacity-40 backdrop-blur-lg rounded-xl drop-shadow-lg hover:bg-opacity-60 cursor-pointer h-10"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="flex items-center justify-center h-full uppercase">
              <>
                {isDragReject ? (
                  <>
                    <XCircleIcon className="h-8 w-8 text-red-600 mr-2" />
                    <p className="h-fit my-auto font-semibold text-white">Invalid File</p>{' '}
                  </>
                ) : (
                  <>
                    <PlusCircleIcon className="h-8 w-8 text-green-600 mr-2" />
                    <p className="h-fit my-auto font-semibold text-white">Drop Here</p>{' '}
                  </>
                )}
              </>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full uppercase">
              <PlusCircleIcon className="h-8 w-8 text-back mr-2" />
              <p className="h-fit my-auto font-semibold text-white">Add Audio</p>
            </div>
          )}
        </div>
      )}
      <aside>
        {file && (
          <>
            <div className="w-full h-20 relative flex justify-center items-center mx-auto">
              <div
                className="h-8 w-8 top-6 left-2 cursor-pointer absolute z-60  rounded-full drop-shadow-sm hover:text-gray-500 hover:text flex hover:border-gray-500"
                onClick={removeMedia}
              >
                <XMarkIcon className="h-6 w-6 z-80  m-auto" aria-label="Remove Media" />
              
              </div>
                 <AudioPlayer src={file.preview} className="!bg-[#333] !border !rounded-md border-gray-700" showSkipControls={false} showJumpControls={false} customAdditionalControls={[]} showFilledProgress={false} layout="horizontal-reverse" />

            </div>
          </>
        )}
      </aside>
    </section>
  );
}
