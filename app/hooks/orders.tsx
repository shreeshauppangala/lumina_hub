import { ReactNode, createContext, useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrders, placeOrder } from './controllers/orders';
import { useSnackBar } from './snackbar';

interface ProvideOrdersI {
  children: ReactNode;
}

interface OrdersI {
  openCheckoutModal: boolean;
  setOpenCheckoutModal: (openCheckoutModal: boolean) => void;
}

const OrdersContext = createContext<any>(null);

export const useOrders = (): OrdersI => useContext(OrdersContext);

const useOrdersFunc = () => {
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

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
      ShowSuccessSnackBar(data.message);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  const onPlaceOrder = (data: { _id: string; selected_quantity: number }) => {
    mutatePlaceOrder(data);
  };

  return {
    UseGetOrders,

    isPlacingOrder,
    onPlaceOrder,

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
