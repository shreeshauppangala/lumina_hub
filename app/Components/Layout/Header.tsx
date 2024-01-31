'use client'

import React from 'react'
import { AppBar, Box, Button, Toolbar, styled } from '@mui/material';
import { hooks } from '@/app/hooks';
import { SignIn, SignUp, ForgotPassword } from '@/app/Auth';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: 'none',
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(5),
}));

const CustomToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'end'
}));

const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
  '&:hover': {
    backgroundColor: theme.palette.common.white, color: theme.palette.grey[700],
    boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
    border: 'none',
  },
}))

const Header = () => {
  const { setOpenSignIn, setOpenSignUp, } = hooks.useAuth()
  return (
    <CustomAppBar position='fixed'>
      <CustomToolbar>
        <Box display='flex' gap={12}>
          <Button color="primary" variant='contained' onClick={() => setOpenSignUp(true)}>Sign Up</Button>
          <SignInButton variant="contained" onClick={() => setOpenSignIn(true)}>Sign In</SignInButton>
        </Box>
      </CustomToolbar>
      <SignIn />
      <SignUp />
      <ForgotPassword/>
    </CustomAppBar>
  )
}

export default Header