'use client';

import React, { useState } from 'react';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { ProductI } from '@/app/constants/interfaces';
import { hooks } from '@/app/hooks';
import { MediumGreyCartIcon } from '@/app/Assets/Icons';
import { getAmountWithCommas } from '@/app/utils';
import { Breadcrumb, Loader } from '../Components';
import {
  DetailsContainer,
  ListedImages,
  PreviewImage,
  PriceText,
  AddToCart,
} from './styles';
import CheckoutModal from './CheckoutModal';

const Page = ({ params }: { params: { id: string } }) => {
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const [product, setProduct] = useState<ProductI | null>(null);

  const { setOpenCheckoutModal } = hooks.useOrders();

  const { UseGetProductDetails } = hooks.useProducts();

  const { data, isLoading } = UseGetProductDetails(params.id);

  const { isAddingToCart, onAddItemsToCart } = hooks.useCart();

  const { user, setOpenSignIn } = hooks.useAuth();

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
              {data?.quantity_available! <= 0 && (
                <FormHelperText error>Out of stock</FormHelperText>
              )}
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
                  disabled={data?.quantity_available! <= 0}
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    if (user) {
                      setProduct(data!);
                      setOpenCheckoutModal(true);
                    } else {
                      setOpenSignIn(true);
                    }
                  }}
                >
                  Buy Now
                </Button>
                <AddToCart
                  disabled={data?.quantity_available! <= 0}
                  color='secondary'
                  loading={isAddingToCart}
                  onClick={() => {
                    if (user) {
                      onAddItemsToCart(data?._id!);
                    } else {
                      setOpenSignIn(true);
                    }
                  }}
                >
                  <MediumGreyCartIcon /> Add To Cart
                </AddToCart>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {user && <CheckoutModal productInfo={product} />}
    </DetailsContainer>
  );
};

export default Page;
