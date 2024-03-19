import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import {
  addProductToCart,
  deleteProductsFromCart,
  getProductsOfCart,
  updateProductQuantityInCart,
} from './controllers/cart';
import { useSnackBar } from './snackbar';
import { ProductI } from '../constants/interfaces';

interface ProvideCartI {
  children: ReactNode;
}

interface CartI {
  UseGetCartData: () => UseQueryResult<ProductI[], Error>;

  isAddingToCart: boolean;
  onAddItemsToCart: (data: ProductI) => void;

  isUpdatingQuantityInCart: boolean;
  onUpdateQuantityOfProduct: (data: ProductI) => void;

  iDeletingProductInCart: boolean;
  onDeleteProductInCart: (data: { ids: string[] }) => void;
}

const CartContext = createContext<any>(null);

export const useCart = (): CartI => useContext(CartContext);

const useCartFunc = () => {
  const queryClient = useQueryClient();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const UseGetCartData = () =>
    useQuery({
      queryKey: ['cart'],
      queryFn: () => getProductsOfCart(),
      select: ({ data }) => data,
    });

  const { mutate: mutateAddItemsToCart, isPending: isAddingToCart } =
    useMutation({
      mutationFn: addProductToCart,
      onSuccess: ({ data }) => {
        queryClient.refetchQueries({ queryKey: ['cart'] });
        ShowSuccessSnackBar(data.message);
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onAddItemsToCart = (data: ProductI) => {
    mutateAddItemsToCart(data);
  };

  const {
    mutate: mutateUpdateQuantityOfProduct,
    isPending: isUpdatingQuantityInCart,
  } = useMutation({
    mutationFn: updateProductQuantityInCart,
    onSuccess: ({ data }) => {
      queryClient.refetchQueries({ queryKey: ['cart'] });
      ShowSuccessSnackBar(data.message);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  const onUpdateQuantityOfProduct = (data: ProductI) => {
    mutateUpdateQuantityOfProduct(data);
  };

  const {
    mutate: mutateDeleteProductInCart,
    isPending: iDeletingProductInCart,
  } = useMutation({
    mutationFn: deleteProductsFromCart,
    onSuccess: ({ data }) => {
      queryClient.refetchQueries({ queryKey: ['cart'] });
      ShowSuccessSnackBar(data.message);
    },
    onError: (error) => {
      ShowApiErrorSnackBar(error);
    },
  });

  const onDeleteProductInCart = (data: { ids: string[] }) => {
    mutateDeleteProductInCart(data);
  };

  return {
    UseGetCartData,

    isAddingToCart,
    onAddItemsToCart,

    isUpdatingQuantityInCart,
    onUpdateQuantityOfProduct,

    iDeletingProductInCart,
    onDeleteProductInCart,
  };
};

export const ProvideCart = ({ children }: ProvideCartI) => {
  const CartValue = useCartFunc();

  return (
    <CartContext.Provider value={CartValue}>{children}</CartContext.Provider>
  );
};
