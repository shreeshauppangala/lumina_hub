'use client';

import React from 'react';
import { Avatar, Box, Button, Divider, Typography, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '../Components';
import { formatDate, getAmountWithCommas } from '../utils';
import { hooks } from '../hooks';
import CheckoutModal from '../details/CheckoutModal';

const OrdersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 10),
  '.orders_container': {
    marginTop: theme.spacing(15),
    '.order_wrapper ': {
      width: '80%',
      borderRadius: theme.spacing(12),
      boxShadow: '0px 2px 10px rgba(3,3,3,0.1)',

      '.header': {
        borderRadius: theme.spacing(12, 12, 0, 0),
        padding: theme.spacing(5, 10),
        backgroundColor: theme.palette.primary.light,

        '.heading': { ...theme.typography.h5, color: theme.palette.grey[500] },
        '.detail': { ...theme.typography.subtitle1 },
      },

      '.details_wrapper': {
        borderRadius: theme.spacing(12, 12, 0, 0),
        padding: theme.spacing(10),

        '.product_image': {
          width: theme.spacing(40),
          height: theme.spacing(40),
        },
        '.product_name': {
          ...theme.typography.h4,
          cursor: 'pointer',
          color: theme.palette.primary.main,
          marginLeft: theme.spacing(5),
          ':hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
}));

const Orders = () => {
  const router = useRouter();
  const { setOpenCheckoutModal } = hooks.useOrders();

  const HeaderDetails = ({ header, detail }: { header: string; detail: string }) => (
    <Box>
      <Typography className='heading'>{header}</Typography>
      <Typography className='detail'>{detail}</Typography>
    </Box>
  );

  return (
    <OrdersContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Cart' }]} />
      <Box display='flex' justifyContent='center' className='orders_container'>
        <Box className='order_wrapper'>
          <Box
            className='header'
            display='flex'
            justifyContent='space-between'
            flexWrap='wrap'
            gap={20}
          >
            <Box display='flex' gap={20} flexWrap='wrap'>
              <HeaderDetails
                header='Order Placed'
                detail={formatDate('2023-10-18T16:05:06.397086+05:30', 'DD MMMM YYYY')!}
              />
              <HeaderDetails header='Total' detail={getAmountWithCommas(5115)} />
              <HeaderDetails header='Ship To' detail='dvf' />
            </Box>
            <Box>
              <HeaderDetails header='Order' detail='# 123456789' />
            </Box>
          </Box>
          <Divider />
          <Box className='details_wrapper'>
            <Box display='flex' flexWrap='wrap'>
              <Box flex={2}>
                <Typography variant='h4'>
                  Current Status {formatDate('2023-10-18T16:05:06.397086+05:30', 'DD-MMM-YYYY')}
                </Typography>
                <Box display='flex' gap={5} flexWrap='wrap' mt={15}>
                  <Avatar
                    src='https://5.imimg.com/data5/AU/ZY/UK/SELLER-86701761/led-bulb-10-volt.jpg'
                    className='product_image'
                    variant='square'
                  />
                  <Box display='grid' gap={10} mt={5}>
                    <Typography className='product_name' onClick={() => router.push(`details/vfs`)}>
                      gb
                    </Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={() => setOpenCheckoutModal(true)}
                    >
                      Buy it again
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Button variant='outlined' color='error'>
                  Cancel Product
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <CheckoutModal />
    </OrdersContainer>
  );
};

export default Orders;
