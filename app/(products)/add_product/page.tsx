'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { Breadcrumb } from '@/app/Components';
import AddEditForm from '../AddEditForm';
import { AddEditProductContainer } from '../styles';

const AddProduct = () => (
  <AddEditProductContainer>
    <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Add Product' }]} />
    <Typography variant='h3' mt={10}>
      Add Product
    </Typography>
    <AddEditForm type='Add' />
  </AddEditProductContainer>
);

export default AddProduct;
