'use client';

import { styled, InputLabel, Box } from '@mui/material';

export const TextFieldComponent = styled(Box)(({ theme }) => ({
  width: '100%',
  '.MuiTextField-root': {
    padding: theme.spacing(2.5, 0),
    '.MuiInputBase-root': {
      boxShadow: '0px 2px 8px rgba(64,60,67,0.24)',
      border: 0,
      borderRadius: theme.spacing(12),
      backgroundColor: theme.palette.common.white,

      input: {
        padding: theme.spacing(5, 7),
      },
    },
    '.Mui-disabled': {
      cursor: 'not-allowed',
    },
    '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

export const InputLabelComponent = styled(InputLabel)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.common.black,
  marginBottom: theme.spacing(2),

  '.required': {
    color: theme.palette.error.main,
  },
}));
