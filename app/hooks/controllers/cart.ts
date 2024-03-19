import { API } from '@/app/constants';
import { ProductI } from '@/app/constants/interfaces';
import { deleteApi, getApi, patchApi, postApi } from '../config';

export const getProductsOfCart = () => getApi(API.cart);

export const addProductToCart = (data: ProductI) => postApi(API.cart, data);

export const updateProductQuantityInCart = (data: any) =>
  patchApi(API.cart, data);

export const deleteProductsFromCart = ({ ids }: { ids: string[] }) =>
  deleteApi(API.cart, { ids });
