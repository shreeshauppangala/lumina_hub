import { ReactNode, createContext, useContext, useState } from 'react';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AddProductFormDataI } from '../constants/interfaces';
import {
  addProduct,
  getProductDetails,
  getProductsList,
} from './controllers/products';
import { useSnackBar } from './snackbar';
import { useMisc } from './misc';

interface ProvideProductsI {
  children: ReactNode;
}

interface AddProductDataI
  extends Omit<AddProductFormDataI, 'bulb_type' | 'pictures'> {
  bulb_type: string;
  pictures: File[];
}

interface ProductsI {
  isAddProductAdding: boolean;
  fileUploading: boolean;
  onAddProduct: (data: AddProductDataI) => void;

  UseGetProductsList: () => UseQueryResult<any, Error>;
  UseGetProductDetails: (id: string) => UseQueryResult<any, Error>;
}

const ProductsContext = createContext<any>(null);

export const useProducts = (): ProductsI => useContext(ProductsContext);

const useProductsFunc = () => {
  const [fileUploading, setFileUploading] = useState(false);
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { onFileUpload } = useMisc();

  const { mutate: mutateAddProduct, isPending: isAddProductAdding } =
    useMutation({
      mutationFn: addProduct,
      onSuccess: ({ data }) => {
        ShowSuccessSnackBar(`${data.name} added successfully`);
        queryClient.refetchQueries({ queryKey: ['product_list'] });
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onAddProduct = async (data: AddProductDataI) =>
    // eslint-disable-next-line consistent-return, no-async-promise-executor
    new Promise(async (resolve) => {
      const pictureUrls = [];
      const files = data.pictures;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        setFileUploading(true);

        // eslint-disable-next-line no-await-in-loop
        const url = await onFileUpload({
          file: files[i],
          folder: 'products',
        });
        pictureUrls.push(url);
        if (i === files.length - 1) {
          mutateAddProduct({ ...data, pictures: pictureUrls });
          setFileUploading(false);
          // eslint-disable-next-line no-promise-executor-return
          return resolve(data);
        }
      }
    });

  const UseGetProductsList = () =>
    useQuery({
      queryKey: ['product_list'],
      queryFn: () => getProductsList(),
      select: ({ data }) => data,
    });

  const UseGetProductDetails = (id: string) =>
    useQuery({
      queryKey: ['product_details', id],
      queryFn: () => getProductDetails(id),
      select: ({ data }) => data,
      enabled: !!id,
    });

  return {
    UseGetProductsList,
    UseGetProductDetails,

    isAddProductAdding,
    fileUploading,
    onAddProduct,
  };
};

export const ProvideProducts = ({ children }: ProvideProductsI) => {
  const ProductsValue = useProductsFunc();

  return (
    <ProductsContext.Provider value={ProductsValue}>
      {children}
    </ProductsContext.Provider>
  );
};
