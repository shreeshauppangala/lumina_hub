import { API } from '@/app/constants';
import { deleteApi, getApi, patchApi, postApi } from '../config';

export const getProductsOfCart = () => getApi(API.cart);

export const addProductToCart = (id: string) => postApi(API.cart, { _id: id });

export const updateProductQuantityInCart = (data: any) =>
  patchApi(API.cart, data);

export const deleteProductsFromCart = ({ ids }: { ids: string[] }) =>
  deleteApi(API.cart, { ids });
