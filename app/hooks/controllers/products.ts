import { Routes } from '@/app/constants';
import { AddEditProductFormDataI } from '@/app/constants/interfaces';
import { deleteApi, getApi, patchApi, postApi } from '../config';

interface AddProductDataI
  extends Omit<AddEditProductFormDataI, 'bulb_type' | 'pictures'> {
  bulb_type: string;
  pictures: string[];
}

export const getProductsList = (search?: string) =>
  getApi(`${Routes.product}${search ? `?search=${search}` : ''}`);

export const getProductDetails = (id: string) =>
  getApi(`${Routes.product}/${id}`);

export const addProduct = (data: AddProductDataI) =>
  postApi(Routes.product, data);

export const updateProduct = (data: AddProductDataI) =>
  patchApi(Routes.product, data);

export const deleteProduct = ({ id }: { id: string }) =>
  deleteApi(`${Routes.product}/${id}`);
