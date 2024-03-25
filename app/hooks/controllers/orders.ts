import { Routes } from '@/app/constants';
import { getApi, patchApi, postApi } from '../config';

export const getOrders = () => getApi(Routes.orders);

export const placeOrder = (
  data: { _id: string; selected_quantity: number; cart_id?: string }[],
) => postApi(Routes.orders, data);

export const updateOrder = (data: { _id: string; status: string }) =>
  patchApi(Routes.orders, data);
