export type ModalNamesTypes = {
  ADMIN_CREATE_EDIT_SPECIALTY: 'admin-create-edit-specialty';
  ADMIN_CREATE_EDIT_SOCIETY: 'admin-create-edit-society';
};

export type ModalNameKeys = keyof ModalNamesTypes;

export type ModalNameValues = ModalNamesTypes[ModalNameKeys] | '';

const ModalNames = {
  ADMIN_CREATE_EDIT_SPECIALTY: 'admin-create-edit-specialty' as ModalNameValues,
  ADMIN_CREATE_EDIT_SOCIETY: 'admin-create-edit-society' as ModalNameValues,
};

export default ModalNames;
