import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { InputField, SearchableDropdown, DropZone } from '../Components';
import { bulbTypes, pattern } from '../constants';
import { AddEditProductFormDataI } from '../constants/interfaces';
import { hooks } from '../hooks';

interface PropsI {
  type: 'Add' | 'Update';
  formData?: AddEditProductFormDataI;
}

const AddEditForm = ({ type, formData }: PropsI) => {
  const [productImages, setProductImages] = useState<File[] | string[]>([]);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<AddEditProductFormDataI>({
    mode: 'all',
    defaultValues: type === 'Update' ? formData : undefined,
  });

  const {
    isAddProductAdding,
    fileUploading,
    onAddProduct,
    isProductUpdating,
    onUpdateProduct,
  } = hooks.useProducts();

  const onSubmit = (data: AddEditProductFormDataI) => {
    const submittedData = {
      ...data,
      bulb_type: data.bulb_type?.value!,
      pictures: productImages,
    };
    if (type === 'Add') {
      onAddProduct(submittedData);
    } else if (type === 'Update') {
      onUpdateProduct(submittedData);
    }
  };

  useEffect(() => {
    if (type === 'Update') {
      setProductImages(formData?.pictures!);
    }
  }, [formData?.pictures, type]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display='grid' gap={10}>
        <Box display='flex' gap={12} mt={10}>
          <Controller
            name='name'
            control={control}
            rules={{
              required: 'Name Is Required',
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                required
                {...field}
                label='Product Name'
                error={!!error}
                helperText={error?.message}
                placeholder='Product Name'
              />
            )}
          />
          <Controller
            name='price'
            control={control}
            rules={{
              required: 'Price Is Required',
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                required
                type='number'
                {...field}
                label='Price'
                error={!!error}
                helperText={error?.message}
                placeholder='Price'
                InputProps={{
                  startAdornment: '₹',
                }}
              />
            )}
          />
        </Box>
        <Box display='flex' gap={12}>
          <Controller
            name='bulb_type'
            control={control}
            rules={{
              required: 'Bulb Type Is Required',
            }}
            render={({ field, fieldState: { error } }) => (
              <SearchableDropdown
                required
                {...field}
                options={bulbTypes}
                label='Bulb Type'
                error={!!error}
                helperText={error?.message}
                placeholder='Bulb Type'
                width='100%'
              />
            )}
          />
          <Controller
            name='watt'
            control={control}
            rules={{
              required: 'Watt Is Required',
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                required
                type='number'
                {...field}
                label='Watt'
                error={!!error}
                helperText={error?.message}
                placeholder='Watt'
              />
            )}
          />
        </Box>
        <Box display='flex' gap={12}>
          <Controller
            name='quantity_available'
            control={control}
            rules={{
              required: 'Quantity Is Required',
              pattern: {
                value: pattern.allowOnlyNumbers,
                message: 'Invalid Quantity',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                required
                type='number'
                {...field}
                label='Quantity'
                error={!!error}
                helperText={error?.message}
                placeholder='Quantity'
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{
              required: 'Description Is Required',
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                required
                type='number'
                {...field}
                label='Description'
                error={!!error}
                helperText={error?.message}
                placeholder='Description'
                multiline
                minRows={4}
              />
            )}
          />
        </Box>
        <Box width='49%'>
          <DropZone
            files={productImages}
            setFiles={setProductImages}
            accept={{ 'image/png': ['.png', '.gif', '.jpeg', '.jpg'] }}
            onlyImages
            label='Product Images'
            required
            multiple
          />
        </Box>
        <Box display='flex' justifyContent='end' gap={5}>
          <LoadingButton
            loading={isAddProductAdding || fileUploading || isProductUpdating}
            type='submit'
            variant='contained'
            color='primary'
          >
            {type} Product
          </LoadingButton>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              reset();
              router.back();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddEditForm;
