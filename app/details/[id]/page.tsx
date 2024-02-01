'use client';

import React, { useState } from 'react';
import { Avatar, Box, Button, Typography, styled } from '@mui/material';
import { MediumGreyCartIcon } from '@/app/Assets/Icons';
import { Breadcrumb } from '../../Components';

const DetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
}));

const ListedImages = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(30),
  height: theme.spacing(40),
  borderRadius: theme.spacing(12),
}));

const PreviewImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(233),
  height: theme.spacing(262),
  borderRadius: theme.spacing(12),
}));

const PriceText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  boxShadow: '0px 2px 4px rgba(3,3,3,0.1)',
  borderRadius: theme.spacing(12),
  padding: theme.spacing(5, 10),
  color: theme.palette.grey[600],
}));

const AddToCart = styled(Button)(({ theme }) => ({
  ...theme.typography.subtitle2,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  padding: theme.spacing(3, 8),
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[700],
    boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
    border: 'none',
  },
}));

const Page = () => {
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const images = [
    'https://5.imimg.com/data5/AU/ZY/UK/SELLER-86701761/led-bulb-10-volt.jpg',
    'https://climatekids.nasa.gov/light-bulbs/led.png',
    'https://climatekids.nasa.gov/light-bulbs/halogen.png',
    'https://climatekids.nasa.gov/light-bulbs/cfl.png',
    'https://climatekids.nasa.gov/light-bulbs/incandescent.png',
  ];
  return (
    <DetailsContainer>
      <Breadcrumb item={[{ name: 'Home', link: '/' }, { name: 'Product Name' }]} />
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
              <PriceText>Price</PriceText>
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
              <Button color='primary' variant='contained'>
                Buy Now
              </Button>
              <AddToCart variant='contained'>
                <MediumGreyCartIcon /> Add To Cart
              </AddToCart>
            </Box>
          </Box>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default Page;
