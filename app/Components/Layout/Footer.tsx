import React from 'react';
import { Box, Typography } from '@mui/material';
import { ConnectLink, FooterContainer } from './styles';

const Footer = () => (
  <FooterContainer>
    <Typography variant='h1'>LUMINA HUB</Typography>
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
