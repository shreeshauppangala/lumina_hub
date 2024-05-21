'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { Breadcrumb, Loader } from '@/app/Components';
import { hooks } from '@/app/hooks';
import AddEditForm from '../../AddEditForm';
import { AddEditProductContainer } from '../../styles';

const EditProduct = ({ params }: { params: { id: string } }) => {
  const { UseGetProductDetails } = hooks.useProducts();

  const { data, isLoading } = UseGetProductDetails(params.id);

  const formData = {
    ...data,
    bulb_type: { label: data?.bulb_type!, value: data?.bulb_type! },
    pictures: data?.pictures!,
    name: data?.name!,
    price: data?.price!,
    watt: data?.watt!,
    quantity_available: data?.quantity_available!,
    description: data?.description!,
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
