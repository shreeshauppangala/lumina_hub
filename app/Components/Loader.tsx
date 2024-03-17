import React from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';

interface LoaderI extends CircularProgressProps {
  type?: 'window' | 'section' | 'table';
}

const Loader = (props: LoaderI) => {
  const { type = 'window' } = props;
  return type === 'window' ? (
    <Backdrop open>
      <CircularProgress {...props} />
    </Backdrop>
  ) : type === 'section' ? (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress {...props} />
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
};

export default Loader;
