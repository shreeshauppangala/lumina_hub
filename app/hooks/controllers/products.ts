import { API } from '@/app/constants';
import { AddProductFormDataI } from '@/app/constants/interfaces';
import { getApi, postApi } from '../config';

interface AddProductDataI
  extends Omit<AddProductFormDataI, 'bulb_type' | 'pictures'> {
  bulb_type: string;
  pictures: string[];
}

export const getProductsList = () => getApi(API.product);

export const getProductDetails = (id: string) => getApi(`${API.product}/${id}`);

export const addProduct = (data: AddProductDataI) => postApi(API.product, data);
