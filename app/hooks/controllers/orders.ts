import { API } from '@/app/constants';
import { getApi, patchApi, postApi } from '../config';

export const getOrders = () => getApi(API.orders);

export const placeOrder = (
  data: { _id: string; selected_quantity: number; cart_id?: string }[],
) => postApi(API.orders, data);

export const updateOrder = (data: { _id: string; status: string }) =>
  patchApi(API.orders, data);
