import React, { useState } from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { hooks } from '@/app/hooks';
import { LoginFormDataI } from '@/app/constants/interfaces';
import { GreyEye, GreyCrossEye } from '@/app/Assets/Icons';
import { pattern } from '@/app/constants';
import { InputField } from '../Components';
import { DialogContainer } from './styles';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    openSignIn,
    setOpenSignIn,
    setOpenSignUp,
    setOpenForgotPassword,
    onSignIn,
    isSignInLoading,
  } = hooks.useAuth();
  const { control, handleSubmit, reset } = useForm<LoginFormDataI>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormDataI) => {
    onSignIn(data);
  };
  return (
    <DialogContainer
      open={openSignIn}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => {
        setOpenSignIn(false);
        reset();
      }}
    >
      <DialogTitle variant='h1' textAlign='center'>
        Log In
      </DialogTitle>
      <DialogContentText textAlign='center' variant='caption'>
        Please enter your credentials to proceed
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display='grid' gap={8} mt={12}>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email Is Required',
                pattern: { value: pattern.email, message: 'Invalid Email' },
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  type='email'
                  {...field}
                  label='Email'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='email'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Password Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  required
                  {...field}
                  label='Password'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='password'
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <GreyEye /> : <GreyCrossEye />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
            <Box display='flex' justifyContent='end'>
              <Typography
                sx={{ cursor: 'pointer' }}
                variant='subtitle2'
                onClick={() => {
                  setOpenSignIn(false);
                  setOpenForgotPassword(true);
                  reset();
                }}
              >
                Forgot your password?
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={isSignInLoading}
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
          >
            Sign In
          </LoadingButton>
        </DialogActions>
      </form>
      <Box display='flex' alignItems='center'>
        <Divider sx={() => ({ width: '45%' })} />
        <Typography p='0 10px'>or</Typography>
        <Divider sx={() => ({ width: '45%' })} />
      </Box>
      <Box display='flex' justifyContent='center' m='6px 0'>
        <GoogleLogin onSuccess={() => {}} onError={() => {}} useOneTap />
      </Box>
      <Box display='flex' justifyContent='center'>
        <DialogContentText variant='caption'>Don&apos;t have an account?</DialogContentText>
        <Typography
          sx={{ cursor: 'pointer' }}
          variant='caption'
          onClick={() => {
            setOpenSignIn(false);
            setOpenSignUp(true);
            reset();
          }}
        >
          <b>Sign Up</b>
        </Typography>
      </Box>
    </DialogContainer>
  );
};

export default SignIn;
