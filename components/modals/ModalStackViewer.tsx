import React, { Fragment, Suspense } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useRootStore } from '@/providers/RootStoreProvider';

import Modals from './modals';
import { observer } from 'mobx-react-lite';

const ModalStackViewer = () => {
  const { modal, closeModal } = useRootStore();
  const hasModal = modal !== '';

  if (!hasModal) {
    return null;
  }

  const ModalComponent = Modals[modal];

  return (
    <Suspense fallback={null}>
      <Transition appear show={hasModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex max-h-screen flex-col items-center justify-center overflow-y-auto md:px-4 xl:px-6"
          // TODO: remove if EOG is not modal
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 h-full w-full bg-neutral-700/[.7]" />
          </Transition.Child>

          <ModalComponent />
        </Dialog>
      </Transition>
    </Suspense>
  );
};

export default observer(ModalStackViewer);
