import { Routes } from '@/app/constants';
import { deleteApi, getApi, patchApi, postApi } from '../config';

export const getProductsOfCart = () => getApi(Routes.cart);

export const addProductToCart = (id: string) =>
  postApi(Routes.cart, { _id: id });

export const updateProductQuantityInCart = (data: {
  _id: string;
  selected_quantity: number;
}) => patchApi(Routes.cart, data);

export const deleteProductsFromCart = (id: string) =>
  deleteApi(`${Routes.cart}/${id}`);
