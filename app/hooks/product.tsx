import { ReactNode, createContext, useContext, useState } from 'react';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AddProductFormDataI } from '../constants/interfaces';
import {
  addProduct,
  deleteProduct,
  getProductDetails,
  getProductsList,
  updateProduct,
} from './controllers/products';
import { useSnackBar } from './snackbar';
import { useMisc } from './misc';

interface ProvideProductsI {
  children: ReactNode;
}

interface AddEditProductDataI
  extends Omit<AddProductFormDataI, 'bulb_type' | 'pictures'> {
  bulb_type: string;
  pictures: File[] | string[];
}

interface ProductsI {
  isAddProductAdding: boolean;
  fileUploading: boolean;
  onAddProduct: (data: AddEditProductDataI) => void;

  isProductUpdating: boolean;
  onUpdateProduct: (data: AddEditProductDataI) => void;

  UseGetProductsList: () => UseQueryResult<any, Error>;
  UseGetProductDetails: (id: string) => UseQueryResult<any, Error>;

  openProductDeleteModal: boolean;
  setOpenProductDeleteModal: (openProductDeleteModal: boolean) => void;
  isProductDeleting: boolean;
  onDeleteProduct: (id: string) => void;
}

const ProductsContext = createContext<any>(null);

export const useProducts = (): ProductsI => useContext(ProductsContext);

const useProductsFunc = () => {
  const [fileUploading, setFileUploading] = useState(false);
  const [openProductDeleteModal, setOpenProductDeleteModal] = useState(false);

  const router = useRouter();

  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { onFileUpload } = useMisc();

  const { mutate: mutateAddProduct, isPending: isAddProductAdding } =
    useMutation({
      mutationFn: addProduct,
      onSuccess: ({ data }) => {
        ShowSuccessSnackBar(`${data.name} added successfully`);
        router.push('/manage_products');
        queryClient.refetchQueries({ queryKey: ['product_list'] });
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const fileUpload = async (files: File[]) => {
    // eslint-disable-next-line no-async-promise-executor, consistent-return
    const urls = new Promise<string[]>(async (resolve) => {
      const pictureUrls: string[] = [];
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
          setFileUploading(false);
          resolve(pictureUrls);
          // eslint-disable-next-line no-promise-executor-return
          return pictureUrls;
        }
      }
    });
    return urls;
  };

  const onAddProduct = async (data: AddEditProductDataI) => {
    if (data.pictures.every((item) => item instanceof File)) {
      const pictureUrls = await fileUpload(data.pictures as File[]);
      mutateAddProduct({ ...data, pictures: pictureUrls });
    }
  };

  const { mutate: mutateUpdateProduct, isPending: isProductUpdating } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: ({ data }) => {
        ShowSuccessSnackBar(`${data.name} Updated successfully`);
        router.push('/manage_products');
        queryClient.refetchQueries({ queryKey: ['product_list'] });
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onUpdateProduct = async (data: AddEditProductDataI) => {
    const filesOnly = data.pictures.filter(
      (item) => item instanceof File,
    ) as File[];

    if (filesOnly.length) {
      const pictureUrls = await fileUpload(data.pictures as File[]);
      const urlsOnly = data.pictures.filter(
        (item) => typeof item === 'string',
      ) as string[];
      mutateUpdateProduct({ ...data, pictures: [...urlsOnly, ...pictureUrls] });
    } else {
      mutateUpdateProduct({ ...data, pictures: data.pictures as string[] });
    }
  };

  const { mutate: mutateDeleteProduct, isPending: isProductDeleting } =
    useMutation({
      mutationFn: deleteProduct,
      onSuccess: ({ data }) => {
        ShowSuccessSnackBar(`${data.data.name} Deleted successfully`);
        setOpenProductDeleteModal(false);
        queryClient.refetchQueries({ queryKey: ['product_list'] });
      },
      onError: (error) => {
        ShowApiErrorSnackBar(error);
      },
    });

  const onDeleteProduct = async (id: string) => {
    mutateDeleteProduct({ id });
  };

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

    isProductUpdating,
    onUpdateProduct,

    isProductDeleting,
    onDeleteProduct,
    openProductDeleteModal,
    setOpenProductDeleteModal,
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
