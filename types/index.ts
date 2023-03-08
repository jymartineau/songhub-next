export interface UploadedFile extends File {
  preview: string;
}

export interface Split { email: string, name: string, percent: number }