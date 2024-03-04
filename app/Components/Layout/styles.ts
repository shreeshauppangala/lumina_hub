'use client';

import { AppBar, Box, Menu, Toolbar, styled } from '@mui/material';
import Link from 'next/link';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderTop: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(10, 60),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(10),
  [theme.breakpoints.down(720)]: {
    padding: theme.spacing(10, 10),
  },
}));

export const ConnectLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.common.black,
  textDecoration: 'none',
}));

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: 'none',
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(5),
}));

export const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'end',
  gap: theme.spacing(5),
}));

export const ProfileMenu = styled(Menu)(({ theme }) => ({
  '.MuiPaper-root': {
    padding: theme.spacing(8),
  },
  '.name': {
    ...theme.typography.body2,
    color: theme.palette.grey[700],
  },
  '.email': {
    ...theme.typography.caption,
    color: theme.palette.grey[500],
  },
  li: {
    padding: theme.spacing(5),
    ':not(:last-of-type)': {
      borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[300]}`,
    },
  },
}));
