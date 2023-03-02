import { ModalNameValues } from '@/components/modals/modalNames';
import { makeAutoObservable } from 'mobx';

export class RootStore {
  isLoading = true;
  modal = '' as ModalNameValues;
  modalProps = {} as any;

  constructor() {
    makeAutoObservable(this);
  }

  async initialize() {
    console.info('Initializing');
    this.isLoading = false;

    console.log('isLoading?', this.isLoading);
  }

  openModal = (modalName: ModalNameValues, modalProps: any = {}) => {
    this.modal = modalName;
    this.modalProps = modalProps;
  };

  closeModal = () => {
    this.modal = '';
    this.modalProps = {};
  };
}

export default RootStore;
