import { ReactNode, createContext, useContext, useState } from 'react';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getOrders, placeOrder, updateOrder } from './controllers/orders';
import { useSnackBar } from './snackbar';
import { OrdersI } from '../constants/interfaces';
import { Routes } from '../constants';

interface ProvideOrdersI {
  children: ReactNode;
}

interface OrderI {
  isPlacingOrder: boolean;
  onPlaceOrder: (
    data: { _id: string; selected_quantity: number; cart_id?: string }[],
  ) => void;

  isOrderUpdating: boolean;
  onUpdateOrder: (data: { _id: string; status: string }) => void;

  openCheckoutModal: boolean;
  setOpenCheckoutModal: (openCheckoutModal: boolean) => void;

  UseGetOrders: () => UseQueryResult<OrdersI[], Error>;
}

const OrdersContext = createContext<any>(null);

export const useOrders = (): OrderI => useContext(OrdersContext);

const useOrdersFunc = () => {
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const router = useRouter();

  const UseGetOrders = () =>
    useQuery({
      queryKey: ['orders'],
      queryFn: () => getOrders(),
      select: ({ data }) => data,
      gcTime: 0,
    });

  const { mutate: mutatePlaceOrder, isPending: isPlacingOrder } = useMutation({
    mutationFn: placeOrder,
    onSuccess: ({ data }) => {
      queryClient.refetchQueries({ queryKey: ['cart'] });
      queryClient.refetchQueries({ queryKey: ['orders'] });
      ShowSuccessSnackBar(data.message);
      setOpenCheckoutModal(false);
      router.push(Routes.orders);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  const onPlaceOrder = (
    data: { _id: string; selected_quantity: number; cart_id?: string }[],
  ) => {
    mutatePlaceOrder(data);
  };

  const { mutate: mutateUpdateOrder, isPending: isOrderUpdating } = useMutation(
    {
      mutationFn: updateOrder,
      onSuccess: ({ data }) => {
        queryClient.refetchQueries({ queryKey: ['orders'] });
        ShowSuccessSnackBar(data.message);
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    },
  );

  const onUpdateOrder = (data: { _id: string; status: string }) => {
    mutateUpdateOrder(data);
  };

  return {
    UseGetOrders,

    isPlacingOrder,
    onPlaceOrder,

    isOrderUpdating,
    onUpdateOrder,

    openCheckoutModal,
    setOpenCheckoutModal,
  };
};

export const ProvideOrders = ({ children }: ProvideOrdersI) => {
  const OrdersValue = useOrdersFunc();

  return (
    <OrdersContext.Provider value={OrdersValue}>
      {children}
    </OrdersContext.Provider>
  );
};
