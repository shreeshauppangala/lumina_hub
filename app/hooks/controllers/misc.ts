import { Routes } from '@/app/constants';
import { getApi, postApi } from '../config';

export const fileUpload = (data: {
  file: File;
  folder: 'user' | 'products';
}) => {
  const formData = new FormData();

  formData.append('file', data.file, data.file.name);
  formData.set('folder', data.folder);

  return postApi(Routes.fileUpload, formData);
};

export const states = (page: number, search: string) =>
  getApi(`${Routes.states}?page=${page}&search=${search}`);

export const cities = (state: string, page: number, search: string) =>
  getApi(`${Routes.cities}?state=${state}&page=${page}&search=${search}`);
