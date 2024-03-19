'use client';

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Breadcrumb, Loader, SearchableDropdown, Stripe } from '../Components';
import { RedLargeDeleteIcon } from '../Assets/Icons';
import { CartContainer, quantityDropdown } from './styles';
import { getAmountWithCommas, getQuantityOptions } from '../utils';
import { hooks } from '../hooks';
import { DropdownValue } from '../constants/interfaces';

const Cart = () => {
  const [quantity, setQuantity] = useState<null | DropdownValue>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { UseGetProfileData } = hooks.useAuth();

  const { UseGetCartData } = hooks.useCart();

  const { data, isLoading } = UseGetCartData();

  const { data: userData } = UseGetProfileData();

  useEffect(() => {}, [quantity]);

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
            {data?.length !== selectedItems.length ? (
              <>
                <Typography>{selectedItems.length} items selected</Typography>
                <Button
                  className='select_all_button'
                  color='inherit'
                  onClick={() =>
                    setSelectedItems(data?.map((product) => product._id)!)
                  }
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
          {isLoading ? (
            <Loader type='table' />
          ) : !data?.length ? (
            <Typography variant='h3' textAlign='center'>
              Cart Is Empty
            </Typography>
          ) : (
            <Box
              display='grid'
              gap={10}
              mt={12}
              maxHeight='50vh'
              overflow='auto'
            >
              {data?.map((item) => (
                <>
                  <Box
                    key={item.name}
                    display='flex'
                    justifyContent='space-between'
                    flexWrap='wrap'
                  >
                    <Box display='flex' gap={10} flexWrap='wrap'>
                      <Box display='flex' gap={5} alignItems='center'>
                        <Checkbox
                          checked={selectedItems.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                        <Avatar
                          src={item?.pictures[0]}
                          className='product_image'
                          variant='square'
                        />
                      </Box>
                      <Box mt={5}>
                        <Typography>{item.name}</Typography>
                        <Box mt={5} display='flex' alignItems='center'>
                          <SearchableDropdown
                            value={{
                              label: item.quantity_available,
                              value: item.quantity_available,
                            }}
                            options={getQuantityOptions(
                              item.quantity_available,
                            )}
                            onChange={(value) => setQuantity(value)}
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
                    <Typography variant='body2'>
                      {getAmountWithCommas(item.price)}
                    </Typography>
                    <Typography variant='body2'>
                      {getAmountWithCommas(
                        Math.imul(Number(quantity?.value), item.price!),
                      )}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              ))}
            </Box>
          )}
          {selectedItems.length ? (
            <Box display='flex' justifyContent='end' mt={12}>
              <Box display='flex' gap={30} justifyContent='space-between'>
                <Typography variant='h3'>
                  Subtotal ({selectedItems.length} items)
                </Typography>
                <Typography variant='h3'>{getAmountWithCommas(100)}</Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
        <Box className='payments_card'>
          <Typography variant='h3'>Order Info</Typography>
          <Box display='grid' gap={10} mt={20}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h4'>Total</Typography>
              <Typography variant='h4'>{getAmountWithCommas(100)}</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between' mt={20}>
              <Typography>Address</Typography>
              <Box display='grid' gap={5}>
                <Typography textAlign='right'>
                  {userData?.house_name}
                </Typography>
                <Typography textAlign='right'>{userData?.village}</Typography>
                <Typography textAlign='right'>
                  {userData?.city}, {userData?.state} - {userData?.pin_code}
                </Typography>
                <Typography textAlign='right'>
                  +91 {userData?.mobile_number}
                </Typography>
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
