import { makeAutoObservable } from "mobx";


export class RootStore  {
    isLoading = true;


  constructor() {
    makeAutoObservable(this)

  }
  
  async initialize() {
    console.info('Initializing');
    this.isLoading = false;

    console.log('isLoading?', this.isLoading)

  }

}

export default RootStore
