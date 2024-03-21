'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Breadcrumb, Loader, SearchableDropdown } from '../Components';
import { RedLargeDeleteIcon } from '../Assets/Icons';
import { CartContainer, quantityDropdown } from './styles';
import { getAmountWithCommas, getQuantityOptions } from '../utils';
import { hooks } from '../hooks';
import { CartDataI } from '../constants/interfaces';

const Cart = () => {
  const [selectedItems, setSelectedItems] = useState<CartDataI[]>([]);

  const { UseGetProfileData } = hooks.useAuth();
  const { data: userData } = UseGetProfileData();

  const {
    UseGetCartData,
    onDeleteProductInCart,
    isUpdatingQuantityInCart,
    onUpdateQuantityOfProduct,
  } = hooks.useCart();

  const { isPlacingOrder, onPlaceOrder } = hooks.useOrders();

  const { data, isLoading } = UseGetCartData();

  const handleCheckboxChange = (product: CartDataI) => {
    if (selectedItems.includes(product)) {
      setSelectedItems(
        selectedItems.filter((item) => item._id !== product._id),
      );
    } else {
      setSelectedItems([...selectedItems, product]);
    }
  };

  const totalPrices = selectedItems.reduce((total, item) => {
    const totalPriceForItem = item.selected_quantity * item.product.price;
    return total + totalPriceForItem;
  }, 0);

  return (
    <CartContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Cart' }]} />
      <Box display='flex' gap={8} flexWrap='wrap' mt={12}>
        <Box className='products_card'>
          <Typography variant='h3'>Shopping Cart</Typography>
          {data?.length ? (
            <Box mt={5} display='flex' alignItems='center'>
              {data?.length !== selectedItems.length ? (
                <>
                  <Typography>{selectedItems.length} items selected</Typography>
                  <Button
                    disabled={!data?.length}
                    className='select_all_button'
                    color='inherit'
                    onClick={() =>
                      setSelectedItems(
                        data?.filter(
                          (item) => item.product.quantity_available > 0,
                        )!,
                      )
                    }
                  >
                    Select all items
                  </Button>
                </>
              ) : (
                <Button
                  disabled={!data?.length}
                  color='inherit'
                  className='select_all_button'
                  onClick={() => setSelectedItems([])}
                >
                  Deselect all items
                </Button>
              )}
            </Box>
          ) : null}
          <Box mt={12} maxHeight='50vh' minHeight='50vh' overflow='auto'>
            {isLoading ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='30vh'
              >
                <Loader type='table' />
              </Box>
            ) : !data?.length ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                minHeight='30vh'
              >
                <Typography variant='h3' textAlign='center'>
                  Cart Is Empty
                </Typography>
              </Box>
            ) : (
              data?.map((item) => (
                <>
                  <Box
                    key={item.product.name}
                    display='flex'
                    justifyContent='space-between'
                    flexWrap='wrap'
                    p='20px 0'
                  >
                    <Box display='flex' gap={10} flexWrap='wrap'>
                      <Box display='flex' gap={5} alignItems='center'>
                        <Checkbox
                          disabled={item.product.quantity_available! <= 0}
                          checked={selectedItems.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                        <Avatar
                          src={item.product.pictures[0]}
                          className='product_image'
                          variant='square'
                        />
                      </Box>
                      <Box mt={5}>
                        <Typography>{item.product.name}</Typography>
                        <Box mt={5} display='flex' alignItems='center'>
                          <SearchableDropdown
                            isDisabled={isUpdatingQuantityInCart}
                            value={{
                              label: item.selected_quantity,
                              value: item.selected_quantity,
                            }}
                            options={getQuantityOptions(
                              item.product.quantity_available,
                            )}
                            onChange={(value) =>
                              onUpdateQuantityOfProduct({
                                _id: item._id,
                                selected_quantity: value.value,
                              })
                            }
                            styles={quantityDropdown}
                            dropdownInnerText='Qty:'
                            type='creatable'
                          />
                          <IconButton
                            onClick={() => onDeleteProductInCart(item._id)}
                          >
                            <RedLargeDeleteIcon />
                          </IconButton>
                        </Box>
                        {item.product.quantity_available! <= 0 && (
                          <FormHelperText error>Out of stock</FormHelperText>
                        )}
                      </Box>
                    </Box>
                    <Typography variant='body2'>
                      {getAmountWithCommas(item.product.price)}
                    </Typography>
                    <Typography variant='body2'>
                      {getAmountWithCommas(
                        Math.imul(item.selected_quantity, item.product.price),
                      )}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              ))
            )}
          </Box>
          {selectedItems.length ? (
            <Box display='flex' justifyContent='end' mt={12}>
              <Box display='flex' gap={30} justifyContent='space-between'>
                <Typography variant='h3'>
                  Subtotal ({selectedItems.length} items)
                </Typography>
                <Typography variant='h3'>
                  {getAmountWithCommas(totalPrices)}
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
        {selectedItems.length ? (
          <Box className='payments_card'>
            <Typography variant='h3'>Order Info</Typography>
            <Box display='grid' gap={10} mt={20}>
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='h4'>Total</Typography>
                <Typography variant='h4'>
                  {getAmountWithCommas(totalPrices)}
                </Typography>
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
              <LoadingButton
                disabled={!selectedItems.length}
                color='secondary'
                fullWidth
                variant='contained'
                loading={isPlacingOrder}
                onClick={() =>
                  onPlaceOrder(
                    selectedItems.map((item) => ({
                      _id: item.product._id,
                      selected_quantity: item.selected_quantity,
                      cart_id: item._id,
                    })),
                  )
                }
              >
                Place Order
              </LoadingButton>
            </Box>
          </Box>
        ) : null}
      </Box>
    </CartContainer>
  );
};

export default Cart;
