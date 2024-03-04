import React from 'react';
import {
  Avatar,
  Box,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { hooks } from '../hooks';
import { CheckoutDialogContainer } from './styles';
import { SearchableDropdown, Stripe } from '../Components';
import { quantityDropdown } from '../cart/styles';
import { getAmountWithCommas, getQuantityOptions } from '../utils';

const CheckoutModal = () => {
  const { openCheckoutModal, setOpenCheckoutModal } = hooks.useOrders();
  return (
    <CheckoutDialogContainer
      open={openCheckoutModal}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => {
        setOpenCheckoutModal(false);
      }}
    >
      <DialogTitle variant='h1'>Checkout</DialogTitle>
      <DialogContent>
        <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
          <Box display='flex' gap={10} flexWrap='wrap'>
            <Avatar
              src='https://5.imimg.com/data5/AU/ZY/UK/SELLER-86701761/led-bulb-10-volt.jpg'
              className='product_image'
              variant='square'
            />
            <Box>
              <Typography mb={5} variant='h4'>
                gb
              </Typography>
              <SearchableDropdown
                value={{ label: 'jk', value: 24 }}
                options={getQuantityOptions()}
                onChange={() => {}}
                styles={quantityDropdown}
                dropdownInnerText='Qty:'
                type='creatable'
              />
            </Box>
          </Box>
          <Typography variant='h4'>{getAmountWithCommas(452745)}</Typography>
        </Box>
        <Box display='flex' justifyContent='end' mt={10}>
          <Box display='grid' gap={5}>
            <Typography textAlign='right'>Company </Typography>
            <Typography textAlign='right'>Village </Typography>
            <Typography textAlign='right'>City, State - Pincode</Typography>
            <Typography textAlign='right'>+91 9633301322</Typography>
          </Box>
        </Box>
        <Box mt={20}>
          <Stripe />
        </Box>
      </DialogContent>
    </CheckoutDialogContainer>
  );
};

export default CheckoutModal;
