'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Checkbox, Divider, IconButton, Typography } from '@mui/material';
import { Breadcrumb, SearchableDropdown, Stripe } from '../Components';
import { RedLargeDeleteIcon } from '../Assets/Icons';
import { CartContainer, quantityDropdown } from './styles';
import { getAmountWithCommas, getQuantityOptions } from '../utils';

const Cart = () => {
  const [quantity, setQuantity] = useState<null | { quantity: number; id: string }>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {}, [quantity]);
  const data = [
    {
      id: '1',
      image: 'efd',
      name: 'sdcf',
      price: 10,
      quantity: 5,
    },
    {
      id: 'fg',
      image: 'efd',
      name: 'sdcf',
      price: 52,
      quantity: 4,
    },
    {
      id: 'ascdas',
      image: 'efd',
      name: 'sdcf',
      price: 578,
      quantity: 425,
    },
    {
      id: 'asd',
      image: 'efd',
      name: 'sdcf',
      price: 33,
      quantity: 542,
    },
    {
      id: 'as',
      image: 'efd',
      name: 'sdcf',
      price: 878,
      quantity: 45,
    },
  ];

  const handleCheckboxChange = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <CartContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Cart' }]} />
      <Box display='flex' gap={8} flexWrap='wrap' mt={12}>
        <Box className='products_card'>
          <Typography variant='h3'>Shopping Cart</Typography>
          <Box mt={5} display='flex' alignItems='center'>
            {data.length !== selectedItems.length ? (
              <>
                <Typography>{selectedItems.length} items selected</Typography>
                <Button
                  className='select_all_button'
                  color='inherit'
                  onClick={() => setSelectedItems(data.map((product) => product.id))}
                >
                  Select all items
                </Button>
              </>
            ) : (
              <Button
                color='inherit'
                className='select_all_button'
                onClick={() => setSelectedItems([])}
              >
                Deselect all items
              </Button>
            )}
          </Box>
          <Box display='grid' gap={10} mt={12} maxHeight='50vh' overflow='auto'>
            {data.map((item) => (
              <>
                <Box key={item.name} display='flex' justifyContent='space-between' flexWrap='wrap'>
                  <Box display='flex' gap={10} flexWrap='wrap'>
                    <Box display='flex' gap={5} alignItems='center'>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <Avatar src={item.image} className='product_image' variant='square' />
                    </Box>
                    <Box mt={5}>
                      <Typography>{item.name}</Typography>
                      <Box mt={5} display='flex' alignItems='center'>
                        <SearchableDropdown
                          value={{ label: item.quantity, value: item.quantity }}
                          options={getQuantityOptions()}
                          onChange={(value) => setQuantity({ quantity: value, id: item.id })}
                          styles={quantityDropdown}
                          dropdownInnerText='Qty:'
                          type='creatable'
                        />
                        <IconButton>
                          <RedLargeDeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant='body2'>{getAmountWithCommas(item.price)}</Typography>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
          {selectedItems.length ? (
            <Box display='flex' justifyContent='end' mt={12}>
              <Box display='flex' gap={30} justifyContent='space-between'>
                <Typography variant='h3'>Subtotal ({selectedItems.length} items)</Typography>
                <Typography variant='h3'>{getAmountWithCommas(100)}</Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
        <Box className='payments_card'>
          <Typography variant='h3'>Order Info</Typography>
          <Box display='grid' gap={10} mt={20}>
            <Box display='flex' justifyContent='space-between'>
              <Typography>Subtotal</Typography>
              <Typography>{getAmountWithCommas(100)}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography>Shipping cost</Typography>
              <Typography>{getAmountWithCommas(100)}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h4'>Total</Typography>
              <Typography variant='h4'>{getAmountWithCommas(100)}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' mt={20}>
              <Typography>Address</Typography>
              <Box display='grid' gap={5}>
                <Typography textAlign='right'>Company </Typography>
                <Typography textAlign='right'>Village </Typography>
                <Typography textAlign='right'>City, State - Pincode</Typography>
                <Typography textAlign='right'>+91 9633301322</Typography>
              </Box>
            </Box>

            <Typography variant='h4'>Payment</Typography>
            <Stripe />
          </Box>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;