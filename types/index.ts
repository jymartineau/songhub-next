/* eslint-disable no-unused-vars */
export interface UploadedFile extends File {
  preview: string;
}

export interface StemUpload {
  title: string;
  audio: string;
  desc: string;
  fileURL: string;
  file?: UploadedFile;
  created: number;
  daw: string;
}

export interface Collaborator {
  writerName: string,
  writerEmail: string,
  writerAffiliation: string,
  writerType: string[],
  publisher: string,
  publisherAffiliation: string,
  territory: string,
  share: number,
}

export enum ModalModes  {
  VIEW = "VIEW",
  CREATE = "CREATE"
}

export interface Split { email: string, name: string, percent: number }