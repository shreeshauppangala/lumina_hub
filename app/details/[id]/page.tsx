'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { hooks } from '@/app/hooks';
import { MediumGreyCartIcon } from '@/app/Assets/Icons';
import { getAmountWithCommas } from '@/app/utils';
import { Breadcrumb } from '../../Components';
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

  const id = usePathname().split('/')[2];
  const { setOpenCheckoutModal } = hooks.useOrders();

  const { UseGetProductDetails } = hooks.useProducts();

  const { data, isLoading } = UseGetProductDetails(id);

  return (
    <DetailsContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: 'Product Name' }]}
      />
      {!isLoading && (
        <Box display='flex' flexWrap='wrap' mt={8} gap={20}>
          <Box display='grid' gap={10} maxHeight='60vh' overflow='auto'>
            {data.pictures.map((image, index) => (
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
              src={data.pictures[previewImageIndex]}
            />
            <Box flex={2}>
              <Box display='flex' gap={24} alignItems='center'>
                <Typography variant='h3'>{data.name}</Typography>
                <PriceText>{getAmountWithCommas(data.price)}</PriceText>
              </Box>
              <Typography variant='body2' mt={20}>
                {data.description}
              </Typography>
              <Typography variant='body2' mt={10}>
                Type : {data.bulb_type}
              </Typography>
              <Typography variant='body2' mt={5}>
                Watts : {data.watt}
              </Typography>
              <Box display='flex' gap={12} mt={10} alignItems='center'>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => setOpenCheckoutModal(true)}
                >
                  Buy Now
                </Button>
                <AddToCart>
                  <MediumGreyCartIcon /> Add To Cart
                </AddToCart>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <CheckoutModal />
    </DetailsContainer>
  );
};

export default Page;
