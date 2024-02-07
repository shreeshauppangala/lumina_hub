'use client';

import React from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '../Components';
import { formatDate, getAmountWithCommas } from '../utils';
import { hooks } from '../hooks';
import CheckoutModal from '../details/CheckoutModal';
import { AddressTooltip, OrdersContainer } from './styles';
import { GreyLargeInfoIcon } from '../Assets/Icons';

const Orders = () => {
  const router = useRouter();
  const { setOpenCheckoutModal } = hooks.useOrders();

  const HeaderDetails = ({ header, detail }: { header: string; detail: string }) => (
    <Box>
      <Typography className='heading'>{header}</Typography>
      <Typography className='detail'>{detail}</Typography>
    </Box>
  );

  const data = [
    {
      order_date: '2024-02-07',
      total_amount: 50.99,
      address: '123 Main St, City, Country',
      order_id: 'ABC123',
      current_status: 'Shipped',
      product_image: 'image_url1.jpg',
      product_name: 'Product 1',
    },
    {
      order_date: '2024-02-06',
      total_amount: 35.75,
      address: '456 Elm St, City, Country',
      order_id: 'DEF456',
      current_status: 'Delivered',
      product_image: 'image_url2.jpg',
      product_name: 'Product 2',
    },
    {
      order_date: '2024-02-05',
      total_amount: 70.5,
      address: '789 Oak St, City, Country',
      order_id: 'GHI789',
      current_status: 'Pending',
      product_image: 'image_url3.jpg',
      product_name: 'Product 3',
    },
  ];

  return (
    <OrdersContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Cart' }]} />
      <Box display='flex' justifyContent='center' width='100%'>
        <Box className='orders_container'>
          {data.map((order) => (
            <Box key={order.order_id} className='order_wrapper'>
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
                    detail={formatDate(order.order_date, 'DD MMMM YYYY')!}
                  />
                  <HeaderDetails header='Total' detail={getAmountWithCommas(order.total_amount)} />
                  <Box display='flex'>
                    <HeaderDetails header='Ship To' detail='Company' />
                    <AddressTooltip
                      title={
                        <Box display='grid' gap={2}>
                          <Typography variant='body2'>Company </Typography>
                          <Typography variant='body2'>Village </Typography>
                          <Typography variant='body2'>City, State - Pincode</Typography>
                          <Typography variant='body2'>+91 9633301322</Typography>
                        </Box>
                      }
                    >
                      <Box>
                        <GreyLargeInfoIcon />
                      </Box>
                    </AddressTooltip>
                  </Box>
                </Box>
                <Box>
                  <HeaderDetails header='Order' detail='# 123456789' />
                </Box>
              </Box>
              <Divider />
              <Box className='details_wrapper'>
                <Box display='flex' flexWrap='wrap'>
                  <Box flex={2}>
                    <Typography
                      variant='h4'
                      color={
                        order.current_status === 'Delivered'
                          ? 'success'
                          : order.current_status === 'Cancelled'
                            ? 'error'
                            : 'default'
                      }
                    >
                      {order.current_status} {formatDate(order.order_date, 'DD-MMM-YYYY')}
                    </Typography>
                    <Box display='flex' gap={5} flexWrap='wrap' mt={15}>
                      <Avatar
                        src={order.product_image}
                        className='product_image'
                        variant='square'
                      />
                      <Box display='grid' gap={10} mt={5}>
                        <Typography
                          className='product_name'
                          onClick={() => router.push(`details/vfs`)}
                        >
                          {order.product_name}
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
          ))}
        </Box>
      </Box>
      <CheckoutModal />
    </OrdersContainer>
  );
};

export default Orders;
