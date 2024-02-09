'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import { hooks } from '@/app/hooks';
import { SignIn, SignUp, ForgotPassword } from '@/app/Auth';
import {
  MediumPrimaryCartIcon,
  MediumPrimaryLogoutIcon,
  MediumPrimaryOrdersIcon,
  MediumPrimaryUserIcon,
} from '@/app/Assets/Icons';
import { useRouter } from 'next/navigation';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: 'none',
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(5),
}));

const CustomToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'end',
}));

const ProfileMenu = styled(Menu)(({ theme }) => ({
  '.MuiPaper-root': {
    padding: theme.spacing(8),
    width: theme.spacing(98),
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

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const { setOpenSignIn, setOpenSignUp } = hooks.useAuth();

  const router = useRouter();
  return (
    <CustomAppBar position='fixed'>
      <CustomToolbar>
        <Box display='flex' gap={12}>
          <Button color='primary' variant='contained' onClick={() => setOpenSignUp(true)}>
            Sign Up
          </Button>
          <Button variant='contained' color='secondary' onClick={() => setOpenSignIn(true)}>
            Sign In
          </Button>
        </Box>
        <Avatar onClick={(event) => setAnchorEl(event.currentTarget)} />
        <ProfileMenu
          id='menu-app_bar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 60,
            horizontal: 'center',
          }}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <Box display='flex' gap={6} alignItems='center'>
            <Avatar src='' />
            <Box>
              <Typography className='name'>name</Typography>
              <Typography className='email'>dfds@ds.dd</Typography>
            </Box>
          </Box>
          <Box mt={6}>
            <Divider />
          </Box>
          <MenuItem
            onClick={() => {
              router.push('/profile');
              setAnchorEl(null);
            }}
          >
            <Box display='flex' gap={4} alignItems='center'>
              <MediumPrimaryUserIcon />
              <Typography>Profile</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/cart');
              setAnchorEl(null);
            }}
          >
            <Box display='flex' gap={4} alignItems='center'>
              <MediumPrimaryCartIcon />
              <Typography>Cart</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/orders');
              setAnchorEl(null);
            }}
          >
            <Box display='flex' gap={4} alignItems='center'>
              <MediumPrimaryOrdersIcon />
              <Typography>Orders</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() => {
              // setLogoutModalOpen(true);
              setAnchorEl(null);
            }}
          >
            <Box display='flex' gap={4} alignItems='center'>
              <MediumPrimaryLogoutIcon />
              <Typography>SignOut</Typography>
            </Box>
          </MenuItem>
        </ProfileMenu>
      </CustomToolbar>
      <SignIn />
      <SignUp />
      <ForgotPassword />
    </CustomAppBar>
  );
};

export default Header;
