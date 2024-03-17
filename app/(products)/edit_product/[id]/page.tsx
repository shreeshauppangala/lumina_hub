'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Breadcrumb, Loader } from '@/app/Components';
import { hooks } from '@/app/hooks';
import AddEditForm from '../../AddEditForm';
import { AddEditProductContainer } from '../../styles';

const EditProduct = () => {
  const id = usePathname().split('/')[2];

  const { UseGetProductDetails } = hooks.useProducts();

  const { data, isLoading } = UseGetProductDetails(id);

  const formData = {
    ...data,
    bulb_type: { label: data?.bulb_type, value: data?.bulb_type },
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <AddEditProductContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: `Edit ${data?.name}` }]}
      />
      <Typography variant='h3' mt={10}>
        Edit {data?.name}
      </Typography>
      {!isLoading && <AddEditForm type='Update' formData={formData} />}
    </AddEditProductContainer>
  );
};

export default EditProduct;
