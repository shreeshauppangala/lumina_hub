'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ProductI } from '@/app/constants/interfaces';
import { hooks } from '@/app/hooks';
import { MediumGreyCartIcon } from '@/app/Assets/Icons';
import { getAmountWithCommas } from '@/app/utils';
import { Breadcrumb, Loader } from '../../Components';
import {
  DetailsContainer,
  ListedImages,
  PreviewImage,
  PriceText,
  AddToCart,
} from '../styles';
import CheckoutModal from '../CheckoutModal';

const Page = () => {
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const [product, setProduct] = useState<ProductI | null>(null);

  const id = usePathname().split('/')[2];
  const { setOpenCheckoutModal } = hooks.useOrders();

  const { UseGetProductDetails } = hooks.useProducts();

  const { data, isLoading } = UseGetProductDetails(id);

  const { isAddingToCart, onAddItemsToCart } = hooks.useCart();

  return (
    <DetailsContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: data?.name }]} />
      {isLoading ? (
        <Loader />
      ) : (
        <Box display='flex' flexWrap='wrap' mt={8} gap={20}>
          <Box display='grid' gap={10} maxHeight='60vh' overflow='auto'>
            {data?.pictures.map((image, index) => (
              <ListedImages
                key={image}
                variant='square'
                src={image}
                onClick={() => setPreviewImageIndex(index)}
              />
            ))}
          </Box>

          <Box display='flex' gap={24} flexWrap='wrap' flex={2}>
            <PreviewImage
              variant='square'
              src={data?.pictures[previewImageIndex]}
            />
            <Box flex={2}>
              <Box display='flex' gap={24} alignItems='center'>
                <Typography variant='h3'>{data?.name}</Typography>
                <PriceText>{getAmountWithCommas(data?.price)}</PriceText>
              </Box>
              <Typography variant='body2' mt={20}>
                {data?.description}
              </Typography>
              <Typography variant='body2' mt={10}>
                Type : {data?.bulb_type}
              </Typography>
              <Typography variant='body2' mt={5}>
                Watts : {data?.watt}
              </Typography>
              <Box display='flex' gap={12} mt={10} alignItems='center'>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    setProduct(data!);
                    setOpenCheckoutModal(true);
                  }}
                >
                  Buy Now
                </Button>
                <AddToCart
                  color='secondary'
                  loading={isAddingToCart}
                  onClick={() => {
                    onAddItemsToCart(data?._id!);
                  }}
                >
                  <MediumGreyCartIcon /> Add To Cart
                </AddToCart>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <CheckoutModal productInfo={product} />
    </DetailsContainer>
  );
};

export default Page;
