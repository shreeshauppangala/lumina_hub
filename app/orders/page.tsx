'use client';

import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '../Components';
import { formatDate, getAmountWithCommas } from '../utils';
import { hooks } from '../hooks';
import CheckoutModal from '../details/CheckoutModal';
import { AddressTooltip, OrdersContainer } from './styles';
import { GreyLargeInfoIcon } from '../Assets/Icons';
import { ProductI } from '../constants/interfaces';

const Orders = () => {
  const [product, setProduct] = useState<ProductI | null>(null);
  const router = useRouter();
  const { setOpenCheckoutModal, UseGetOrders, isOrderUpdating, onUpdateOrder } =
    hooks.useOrders();

  const { UseGetProfileData } = hooks.useAuth();
  const { data: userData } = UseGetProfileData();

  const { data } = UseGetOrders();

  const HeaderDetails = ({
    header,
    detail,
  }: {
    header: string;
    detail: string;
  }) => (
    <Box>
      <Typography className='heading'>{header}</Typography>
      <Typography className='detail'>{detail}</Typography>
    </Box>
  );

  return (
    <OrdersContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Orders' }]} />
      <Box display='flex' justifyContent='center' width='100%'>
        <Box className='orders_container'>
          {data?.map((order) => (
            <Box key={order._id} className='order_wrapper'>
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
                  <HeaderDetails
                    header='Total'
                    detail={getAmountWithCommas(order.total_amount)}
                  />
                  <Box display='flex'>
                    <HeaderDetails header='Ship To' detail='Company' />
                    <AddressTooltip
                      title={
                        <Box display='grid' gap={2}>
                          <Typography variant='body2'>
                            {userData?.house_name}
                          </Typography>
                          <Typography variant='body2'>
                            {userData?.village}
                          </Typography>
                          <Typography variant='body2'>
                            {userData?.city}, {userData?.state} -{' '}
                            {userData?.pin_code}
                          </Typography>
                          <Typography variant='body2'>
                            +91 {userData?.mobile_number}
                          </Typography>
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
                        order.current_status === 'delivered'
                          ? 'success'
                          : order.current_status === 'cancelled'
                            ? 'error'
                            : 'default'
                      }
                    >
                      {order.current_status}{' '}
                      {formatDate(order.order_date, 'DD-MMM-YYYY')}
                    </Typography>
                    <Box display='flex' gap={5} flexWrap='wrap' mt={15}>
                      <Avatar
                        src={order.product.item.pictures[0]}
                        className='product_image'
                        variant='square'
                      />
                      <Box display='grid' gap={10} mt={5}>
                        <Typography
                          className='product_name'
                          onClick={() => router.push(`details/vfs`)}
                        >
                          {order.product.item.name}
                        </Typography>
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          onClick={() => {
                            setProduct(order.product.item);
                            setOpenCheckoutModal(true);
                          }}
                        >
                          Buy it again
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  {!['cancelled', 'delivered'].includes(
                    order.current_status,
                  ) && (
                    <Box>
                      <Button
                        onClick={() =>
                          onUpdateOrder({
                            _id: order._id,
                            status: 'cancelled',
                          })
                        }
                        disabled={isOrderUpdating}
                        variant='outlined'
                        color='error'
                      >
                        Cancel Product
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <CheckoutModal productInfo={product} />
    </OrdersContainer>
  );
};

export default Orders;
