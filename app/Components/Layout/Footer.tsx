'use client';

import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import Link from 'next/link';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderTop: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(10, 60),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ConnectLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.common.black,
  textDecoration: 'none',
}));

const Footer = () => (
  <FooterContainer>
    <Typography variant='h1' maxWidth='50%'>
      LUMINA HUB ELECTRONICS
    </Typography>
    <Box>
      <Typography variant='h5' mb={6}>
        connect
      </Typography>
      <Box display='grid' gap={4}>
        <ConnectLink href='https://twitter.com/'>X</ConnectLink>
        <ConnectLink href='https://www.instagram.com/'>Instagram</ConnectLink>
        <ConnectLink href='https://www.linkedin.com/'>LinkedIn</ConnectLink>
        <ConnectLink href=''>Get Support</ConnectLink>
        <ConnectLink href=''>Find Stores Nearby</ConnectLink>
      </Box>
    </Box>
  </FooterContainer>
);

export default Footer;
