export type ModalNamesTypes = {
  ADMIN_CREATE_EDIT_SPECIALTY: 'admin-create-edit-specialty';
};

export type ModalNameKeys = keyof ModalNamesTypes;

export type ModalNameValues = ModalNamesTypes[ModalNameKeys] | '';

const ModalNames = {
  ADMIN_CREATE_EDIT_SPECIALTY: 'admin-create-edit-specialty' as ModalNameValues,
};

export default ModalNames;
