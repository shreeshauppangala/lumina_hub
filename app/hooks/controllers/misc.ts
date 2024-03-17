import { API } from '@/app/constants';
import { postApi } from '../config';

export const fileUpload = (data: {
  file: File;
  folder: 'user' | 'products';
}) => {
  const formData = new FormData();

  formData.append('file', data.file, data.file.name);
  formData.set('folder', data.folder);

  return postApi(API.fileUpload, formData);
};
