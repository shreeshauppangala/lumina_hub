import React, { useState } from 'react'
import { DialogTitle, DialogContentText, DialogActions, Box, IconButton, FormControlLabel, Checkbox } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { SignUpFormDataI } from '@/app/constants/interfaces'
import { hooks } from '@/app/hooks'
import { pattern } from '@/app/constants'
import { GreyCrossEye, GreyEye } from '@/app/Assets/Icons'
import { InputField } from '../Components'
import { DialogContainer } from './styles'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { openSignUp, setOpenSignUp, setOpenSignIn } = hooks.useAuth()

  const {
    control,
    handleSubmit,
    getValues,
    reset
  } = useForm<SignUpFormDataI>({
    mode: 'all',
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      address: '',
      city: '',
      state: '',
      pin_code: undefined,
      mobile_number: undefined,
      termsAgreement: false,
    },
  });

  const onSubmit = (data: SignUpFormDataI) => {
    JSON.stringify(data);
  };

  return (
    <DialogContainer
      open={openSignUp}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => { setOpenSignUp(false); reset() }}
    >
      <DialogTitle variant='h1' textAlign='center' mb={4}>
        Sign Up
      </DialogTitle>
      <DialogContentText variant='caption' textAlign='center' id='alert-dialog-description'>
        Sign up to proceed
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='grid' gap={8} mt={12}>
          <Box display='flex' gap={10}>
            <Controller
              name='full_name'
              control={control}
              rules={{
                required: 'Name Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='Full Name'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='full name'
                />
              )}
            />
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
          </Box>
          <Box display='flex' gap={10}>

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Password Is Required',
                pattern: {
                  value: pattern.strongPassword,
                  message: `Password minimum length should be 8 and should include one lowercase,
                one uppercase, one digit and one special character`
                }
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
            <Controller
              name='confirm_password'
              control={control}
              rules={{
                required: 'Password Is Required',
                validate: (value) =>
                  value !== getValues('password') ? 'Password did not match' : undefined,
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  {...field}
                  label='Confirm Password'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='password'
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <GreyEye /> : <GreyCrossEye />}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <Box display='flex' gap={10}>
            <Controller
              name='state'
              control={control}
              rules={{
                required: 'State Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='State'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='state'
                />
              )}
            />
            <Controller
              name='city'
              control={control}
              rules={{
                required: 'City Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='City'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='city'
                />
              )}
            />
          </Box>
          <Box display='flex' gap={10}>
            <Controller
              name='pin_code'
              control={control}
              rules={{
                required: 'Pin Code Is Required',
                pattern: { value: pattern.pinCode, message: 'Invalid Pin code' }
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type='number'
                  required
                  {...field}
                  label='Pin Code'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='pin code'
                />
              )}
            />
            <Controller
              name='mobile_number'
              control={control}
              rules={{
                required: 'Mobile Number Is Required',
                pattern: { value: pattern.mobile, message: 'Invalid Mobile Number' }
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  InputProps={{
                    startAdornment: '+91',
                  }}
                  type='number'
                  required
                  {...field}
                  label='Mobile Number'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='mobile number'
                />
              )}
            />
          </Box>
          <Box width='50%'>
            <Controller
              name='address'
              control={control}
              rules={{
                required: 'Address Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='Address'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='address'
                  multiline
                  minRows={4}
                  maxRows={4}
                />
              )}
            />
          </Box>
          <Controller
            name='termsAgreement'
            control={control}
            rules={{
              required: 'Please Agree to the Terms and conditions',
            }}
            render={({ field }) => (
              <FormControlLabel
                sx={(theme) => ({ span: { ...theme.typography.subtitle2 } })}
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    name="termsAgreement"
                  />
                }
                label="By signing up, you agree to our Terms and Privacy Policy."
              />
            )}
          />
        </Box>
        <DialogActions>
          <LoadingButton variant='contained' color='primary' fullWidth type='submit'>
            SignUp
          </LoadingButton>
        </DialogActions>
      </form>
      <Box display='flex' justifyContent='center'>
        <DialogContentText variant='caption'>
          Already have an account?
        </DialogContentText>
        <DialogContentText
          sx={{ cursor: 'pointer' }}
          variant='caption'
          onClick={() => { setOpenSignIn(true); setOpenSignUp(false); reset() }}
        ><b>Sign In</b>
        </DialogContentText>
      </Box>
    </DialogContainer>
  )
}

export default SignUp