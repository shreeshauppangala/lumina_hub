'use client';

import React, { useEffect } from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  FormLabel,
  Typography,
} from '@mui/material';
import { hooks } from '../hooks';

const Verify = () => {
  const { isVerifyingEmail, onVerifyEmail, isEmailVerified } = hooks.useAuth();

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('verifyEmail');

  useEffect(() => {
    if (token) {
      onVerifyEmail({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerifyingEmail) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Box margin='auto' width='100%' p={10}>
      {isEmailVerified ? (
        <Typography textAlign='center' color='success'>
          Email Verified Successfully
        </Typography>
      ) : (
        <FormLabel error>Something Went Wrong</FormLabel>
      )}
    </Box>
  );
};

export default Verify;
