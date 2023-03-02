import dynamic from 'next/dynamic';

import ModalNames from './modalNames';

const Modals = {
  [ModalNames.ADMIN_CREATE_EDIT_SPECIALTY]: dynamic(() => import('./AdminCreateEditSpecialtyModal'), { ssr: false })
};

export default Modals;
