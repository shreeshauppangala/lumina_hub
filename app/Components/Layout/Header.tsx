'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';
import { hooks } from '@/app/hooks';
import { SignIn, SignUp, ForgotPassword, SignOut } from '@/app/Auth';
import {
  MediumPrimaryCartIcon,
  MediumPrimaryLogoutIcon,
  MediumPrimaryOrdersIcon,
  MediumPrimaryUserIcon,
} from '@/app/Assets/Icons';
import { useRouter } from 'next/navigation';
import { CustomAppBar, CustomToolbar, ProfileMenu } from './styles';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLDivElement) | null
  >(null);
  const { setOpenSignIn, setOpenSignUp, setLogoutModalOpen, user } =
    hooks.useAuth();

  const router = useRouter();
  return (
    <CustomAppBar position='fixed'>
      <CustomToolbar>
        {user ? (
          <>
            <Avatar
              src={user.picture}
              onClick={(event) => setAnchorEl(event.currentTarget)}
            />
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
                <Avatar src={user.picture} />
                <Box>
                  <Typography className='name'>{user.full_name}</Typography>
                  <Typography className='email'>{user.email}</Typography>
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
              {user?.isAdmin ? (
                <MenuItem
                  onClick={() => {
                    router.push('/manage_products');
                    setAnchorEl(null);
                  }}
                >
                  <Box display='flex' gap={4} alignItems='center'>
                    <MediumPrimaryOrdersIcon />
                    <Typography>Manage Products</Typography>
                  </Box>
                </MenuItem>
              ) : null}
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
                  setLogoutModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                <Box display='flex' gap={4} alignItems='center'>
                  <MediumPrimaryLogoutIcon />
                  <Typography>SignOut</Typography>
                </Box>
              </MenuItem>
            </ProfileMenu>
          </>
        ) : (
          <Box display='flex' gap={12}>
            <Button
              color='primary'
              variant='contained'
              onClick={() => setOpenSignUp(true)}
            >
              Sign Up
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setOpenSignIn(true)}
            >
              Sign In
            </Button>
          </Box>
        )}
      </CustomToolbar>
      <SignIn />
      <SignUp />
      <SignOut />
      <ForgotPassword />
    </CustomAppBar>
  );
};

export default Header;
