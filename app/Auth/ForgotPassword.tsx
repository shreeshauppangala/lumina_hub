import React from 'react'
import { DialogTitle, DialogContentText, DialogContent, Box, Typography, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { hooks } from '@/app/hooks';
import { pattern } from '@/app/constants';
import { InputField } from '../Components';
import { DialogContainer } from './styles';

const ForgotPassword = () => {
  const { openForgotPassword, setOpenForgotPassword, setOpenSignUp, setOpenSignIn } = hooks.useAuth()

  const {
    control,
    handleSubmit,
    reset
  } = useForm<{ email: string }>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: { email: string }) => {
    JSON.stringify(data);
  };

  return (
    <DialogContainer
      open={openForgotPassword}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => { setOpenForgotPassword(false); reset() }}
    >
      <DialogTitle variant='h1' textAlign='center'>
        Reset Password
      </DialogTitle>
      <DialogContentText textAlign='center' variant='caption' id='alert-dialog-description'>
        Enter your email to reset password
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display='grid' gap={8} mt={12}>
            <Controller
              name='email'
              control={control}
              rules={{
                required: 'Email Is Required',
                pattern: { value: pattern.email, message: 'Invalid Email' }
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
            <Box display='flex' justifyContent='end'>
              <Typography sx={{ cursor: 'pointer' }}
                variant='subtitle2'
                onClick={() => { setOpenForgotPassword(false); setOpenSignIn(true); reset() }}>Back to login
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant='contained' color='primary' fullWidth type='submit'>
            Reset Password
          </LoadingButton>
        </DialogActions>
      </form>
      <Box display='flex' justifyContent='center'>
        <DialogContentText textAlign='center' variant='caption'>
          Don&apos;t have an account?
        </DialogContentText>
        <Typography sx={{ cursor: 'pointer' }}
          variant='caption'
          onClick={() => { setOpenForgotPassword(false); setOpenSignUp(true) }}
        ><b>Sign Up</b>
        </Typography>
      </Box>
    </DialogContainer>
  )
}

export default ForgotPassword