'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Breadcrumb,
  DropZone,
  InputField,
  SearchableDropdown,
} from '../Components';
import { AddProductFormDataI } from '../constants/interfaces';
import { bulbTypes, pattern } from '../constants';

const AddProductContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
}));

const AddProduct = () => {
  const [productImages, setProductImages] = useState<File[] | string[]>([]);
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<AddProductFormDataI>({
    mode: 'all',
  });

  const onSubmit = (data: AddProductFormDataI) => {
    JSON.stringify(data);
  };

  return (
    <AddProductContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: 'Add Product' }]}
      />
      <Typography variant='h3' mt={10}>
        Add Product
      </Typography>
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
              name='type'
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
              name='quantity'
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
            />
          </Box>
          <Box display='flex' justifyContent='end' gap={5}>
            <Button type='submit' variant='contained' color='primary'>
              Add Product
            </Button>
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
    </AddProductContainer>
  );
};

export default AddProduct;
