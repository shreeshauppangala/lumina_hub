'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { DetailsContainer } from './styles';
import { Breadcrumb } from '../Components';

const NotFound = () => (
  <DetailsContainer>
    <Breadcrumb
      item={[{ name: 'Home', link: '/' }, { name: 'Product Not Found' }]}
    />
    <Box
      minHeight='60vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Typography variant='h2'>
        The Product you Searched For is Not Found
      </Typography>
    </Box>
  </DetailsContainer>
);

export default NotFound;
