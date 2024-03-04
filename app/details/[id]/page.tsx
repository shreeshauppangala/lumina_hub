'use client';

import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
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
  const { setOpenCheckoutModal } = hooks.useOrders();

  const images = [
    'https://5.imimg.com/data5/AU/ZY/UK/SELLER-86701761/led-bulb-10-volt.jpg',
    'https://climatekids.nasa.gov/light-bulbs/led.png',
    'https://climatekids.nasa.gov/light-bulbs/halogen.png',
    'https://climatekids.nasa.gov/light-bulbs/cfl.png',
    'https://climatekids.nasa.gov/light-bulbs/incandescent.png',
  ];
  return (
    <DetailsContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: 'Product Name' }]}
      />
      <Box display='flex' flexWrap='wrap' mt={8} gap={20}>
        <Box display='grid' gap={10} maxHeight='60vh' overflow='auto'>
          {images.map((image, index) => (
            <ListedImages
              key={image}
              variant='square'
              src={image}
              onClick={() => setPreviewImageIndex(index)}
            />
          ))}
        </Box>

        <Box display='flex' gap={24} flexWrap='wrap' flex={2}>
          <PreviewImage variant='square' src={images[previewImageIndex]} />
          <Box flex={2}>
            <Box display='flex' gap={24} alignItems='center'>
              <Typography variant='h3'>Name</Typography>
              <PriceText>{getAmountWithCommas(20)}</PriceText>
            </Box>
            <Typography variant='body2' mt={20}>
              Description
            </Typography>
            <Typography variant='body2' mt={10}>
              Type :
            </Typography>
            <Typography variant='body2' mt={5}>
              Watts :
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
      <CheckoutModal />
    </DetailsContainer>
  );
};

export default Page;
