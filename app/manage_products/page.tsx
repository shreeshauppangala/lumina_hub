'use client';

import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import { Breadcrumb, Table } from '../Components';
import { ManageProductsContainer } from './styles';
import { hooks } from '../hooks';
import { getAmountWithCommas } from '../utils';
import { PencilIcon, RedLargeDeleteIcon } from '../Assets/Icons';

const ManageProducts = () => {
  const router = useRouter();

  const { UseGetProductsList } = hooks.useProducts();

  const { data, isLoading } = UseGetProductsList();

  const columns: TableColumn<any>[] = [
    {
      name: 'name',
      cell: (row) => row.name,
    },
    {
      name: 'type',
      cell: (row) => row.bulb_type,
    },
    {
      name: 'price',
      cell: (row) => getAmountWithCommas(row.price),
    },
    {
      name: 'Quantity Available',
      cell: (row) => row.quantity_available,
    },
    {
      name: 'Action',
      cell: (row) => (
        <Box display='flex' gap={10}>
          <IconButton onClick={() => router.push(`/edit_product/${row._id}`)}>
            <PencilIcon />
          </IconButton>
          <IconButton>
            <RedLargeDeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <ManageProductsContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: 'Manage products' }]}
      />

      <Box display='flex' justifyConst='end' mt={20} mb={10}>
        <Button onClick={() => router.push('/add_product')}>Add Product</Button>
      </Box>

      <Table columns={columns} data={data} progressPending={isLoading} />
    </ManageProductsContainer>
  );
};

export default ManageProducts;
