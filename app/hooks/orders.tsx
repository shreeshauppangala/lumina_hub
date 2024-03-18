import { ReactNode, createContext, useContext, useState } from 'react';
import { DropdownValue } from '../constants/interfaces';

interface ProvideOrdersI {
  children: ReactNode;
}

interface OrdersI {
  openCheckoutModal: boolean;
  setOpenCheckoutModal: (openCheckoutModal: boolean) => void;
  selectedQuantity: DropdownValue;
  setSelectedQuantity: (selectedQuantity: DropdownValue) => void;
}

const OrdersContext = createContext<any>(null);

export const useOrders = (): OrdersI => useContext(OrdersContext);

const useOrdersFunc = () => {
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState({
    label: '1',
    value: 1,
  });
  return {
    openCheckoutModal,
    setOpenCheckoutModal,

    selectedQuantity,
    setSelectedQuantity,
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
