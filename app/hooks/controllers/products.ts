import { API } from '@/app/constants';
import { AddProductFormDataI } from '@/app/constants/interfaces';
import { deleteApi, getApi, patchApi, postApi } from '../config';

interface AddProductDataI
  extends Omit<AddProductFormDataI, 'bulb_type' | 'pictures'> {
  bulb_type: string;
  pictures: string[];
}

export const getProductsList = () => getApi(API.product);

export const getProductDetails = (id: string) => getApi(`${API.product}/${id}`);

export const addProduct = (data: AddProductDataI) => postApi(API.product, data);

export const updateProduct = (data: AddProductDataI) =>
  patchApi(API.product, data);

export const deleteProduct = ({ id }: { id: string }) =>
  deleteApi(`${API.product}/${id}`);
