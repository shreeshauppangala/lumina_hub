import { ReactNode, createContext, useContext, useState } from 'react';

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
  return {
    openCheckoutModal,
    setOpenCheckoutModal,
  };
};

export const ProvideOrders = ({ children }: ProvideOrdersI) => {
  const OrdersValue = useOrdersFunc();

  return <OrdersContext.Provider value={OrdersValue}>{children}</OrdersContext.Provider>;
};
