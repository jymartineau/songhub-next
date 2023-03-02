import React from 'react';
import { Transition } from '@headlessui/react';

import { useRootStore } from '@/providers/RootStoreProvider';

interface ModalProps {
  children: React.ReactNode;
  hideExit?: boolean;
}

const Modal = (props: ModalProps) => {
  const { closeModal } = useRootStore();
  const { children } = props;

  return (
    <Transition.Child
      as={'div'}
      className="relative max-h-full max-w-full bg-white p-[10px] 2xl:max-w-[1550px]"
      enter="ease-out duration-500"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <>
      {!props.hideExit && (
        <div className="absolute right-0 top-0 z-10 flex flex-row items-center justify-center bg-white">
          <button
            aria-label="Close modal"
            className="flex flex-row items-center p-[15px] text-center text-[20px] leading-none text-blue-dark 2xl:p-[20px] 2xl:text-[27px] focus:outline-none"
            onClick={() => closeModal()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="relative transform bg-white text-left align-middle transition-all">{children}</div>
      </>
     </Transition.Child>
  );
};

export default Modal;
