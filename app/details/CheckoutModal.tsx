import React, { useState } from 'react';
import {
  Avatar,
  Box,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { hooks } from '../hooks';
import { CheckoutDialogContainer } from './styles';
import { SearchableDropdown } from '../Components';
import { quantityDropdown } from '../cart/styles';
import { getAmountWithCommas, getQuantityOptions } from '../utils';
import { ProductI } from '../constants/interfaces';

interface PropsI {
  productInfo: ProductI | null;
}

const CheckoutModal = ({ productInfo }: PropsI) => {
  const [selectedQuantity, setSelectedQuantity] = useState({
    label: '1',
    value: 1,
  });

  const { openCheckoutModal, setOpenCheckoutModal } = hooks.useOrders();

  const { UseGetProfileData } = hooks.useAuth();

  const { data: userData } = UseGetProfileData();

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
              src={productInfo?.pictures[0]}
              className='product_image'
              variant='square'
            />
            <Box>
              <Typography mb={5} variant='h4'>
                {productInfo?.name}
              </Typography>
              <SearchableDropdown
                value={selectedQuantity}
                options={getQuantityOptions(productInfo?.quantity_available!)}
                onChange={(value) => setSelectedQuantity(value)}
                styles={quantityDropdown}
                dropdownInnerText='Qty:'
              />
            </Box>
          </Box>
          <Typography variant='h4'>
            {getAmountWithCommas(
              Math.imul(Number(selectedQuantity?.value), productInfo?.price!),
            )}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end' mt={10}>
          <Box display='grid' gap={5}>
            <Typography textAlign='right'>{userData?.house_name} </Typography>
            <Typography textAlign='right'>{userData?.village} </Typography>
            <Typography textAlign='right'>
              {userData?.city}, {userData?.state} - {userData?.pin_code}
            </Typography>
            <Typography textAlign='right'>
              +91 {userData?.mobile_number}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </CheckoutDialogContainer>
  );
};

export default CheckoutModal;
