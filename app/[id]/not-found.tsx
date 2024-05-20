'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import notfoundImg from '../Assets/Images/not-found.png';
import { Breadcrumb } from '../Components';
import { NotFoundContainer } from './styles';

const NotFound = () => {
  const router = useRouter();
  return (
    <NotFoundContainer>
      <Breadcrumb
        item={[{ name: 'Home', link: '/' }, { name: 'Product Not Found' }]}
      />
      <Box display='flex' gap={20} alignItems='center' justifyContent='center'>
        <Image style={{ height: '62vh' }} src={notfoundImg} alt='not found' />
        <Box>
          <Typography className='title'>
            We looked <br /> everywhere.
          </Typography>
          <Typography className='content'>
            Looks like this product does not exists.
          </Typography>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Box>
      </Box>
    </NotFoundContainer>
  );
};

export default NotFound;
