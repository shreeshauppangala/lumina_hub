import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContentText,
  DialogActions,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GoogleLogin } from '@react-oauth/google';
import { Controller, useForm } from 'react-hook-form';
import { SignUpFormDataI } from '@/app/constants/interfaces';
import { hooks } from '@/app/hooks';
import { pattern } from '@/app/constants';
import { GreyCrossEye, GreyEye } from '@/app/Assets/Icons';
import { DropZone, InputField, SearchableDropdown } from '../Components';
import { DialogContainer } from './styles';
import { getDecodedJWT } from '../utils';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File[] | string[]>([]);
  const {
    openSignUp,
    setOpenSignUp,
    setOpenSignIn,
    onSignUp,
    isSignUpLoading,
  } = hooks.useAuth();

  const { getStates, getCity } = hooks.useMisc();

  const { control, handleSubmit, getValues, reset, setValue, watch } =
    useForm<SignUpFormDataI>({
      mode: 'all',
      defaultValues: {
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
        house_name: '',
        village: '',
        city: null,
        state: null,
        pin_code: undefined,
        mobile_number: undefined,
        termsAgreement: false,
      },
    });

  const onSubmit = (data: SignUpFormDataI) => {
    onSignUp({
      ...data,
      picture: image[0],
      city: data.city?.value!,
      state: data.state?.value!,
    });
  };

  return (
    <DialogContainer
      sx={{ '.MuiPaper-root': { minWidth: '60%' } }}
      open={openSignUp}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => {
        setOpenSignUp(false);
        reset();
      }}
    >
      <DialogTitle variant='h1' textAlign='center' mb={4}>
        Sign Up
      </DialogTitle>
      <DialogContentText
        variant='caption'
        textAlign='center'
        id='alert-dialog-description'
      >
        Sign up to proceed
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='grid' gap={8} mt={12}>
          <DropZone
            files={image}
            setFiles={setImage}
            accept={{ 'image/png': ['.png', '.gif', '.jpeg', '.jpg'] }}
          />
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
                one uppercase, one digit and one special character`,
                },
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
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
                  value !== getValues('password')
                    ? 'Password did not match'
                    : undefined,
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
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
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
              name='house_name'
              control={control}
              rules={{
                required:
                  'Flat, House no., Building, Company, Apartment Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='Flat, House no., Building, Company, Apartment'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='Flat, House no., Building, Company, Apartment'
                />
              )}
            />
            <Controller
              name='village'
              control={control}
              rules={{
                required: 'Area, Street, Sector, Village Is Required',
              }}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  required
                  {...field}
                  label='Area, Street, Sector, Village'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='Area, Street, Sector, Village'
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
                <SearchableDropdown
                  required
                  {...field}
                  loadOptions={getStates}
                  label='State'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='State'
                  width='100%'
                  type='asyncPaginate'
                  additional={{
                    page: 1,
                  }}
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
                <SearchableDropdown
                  isDisabled={!watch('state')}
                  cacheUniqs={[watch('state')]}
                  required
                  {...field}
                  loadOptions={(
                    usersSearchText: string,
                    prevOptions: {
                      name: string;
                      id: string;
                    }[],
                    page: {
                      page: number;
                    },
                  ) =>
                    getCity(
                      usersSearchText,
                      prevOptions,
                      page,
                      watch('state')?.value!,
                    )
                  }
                  label='City'
                  error={!!error}
                  helperText={error?.message}
                  placeholder='City'
                  width='100%'
                  type='asyncPaginate'
                  additional={{
                    page: 1,
                  }}
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
                pattern: {
                  value: pattern.pinCode,
                  message: 'Invalid Pin code',
                },
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
                pattern: {
                  value: pattern.mobile,
                  message: 'Invalid Mobile Number',
                },
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
                    name='termsAgreement'
                  />
                }
                label='By signing up, you agree to our Terms and Privacy Policy.'
              />
            )}
          />
        </Box>
        <DialogActions>
          <LoadingButton
            loading={isSignUpLoading}
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
          >
            SignUp
          </LoadingButton>
        </DialogActions>
      </form>
      <Box display='flex' alignItems='center'>
        <Divider sx={() => ({ width: '47%' })} />
        <Typography p='0 10px'>or</Typography>
        <Divider sx={() => ({ width: '47%' })} />
      </Box>
      <Box display='flex' justifyContent='center' m='6px 0'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const data = getDecodedJWT(credentialResponse.credential);

            setValue('email', data?.email);
            setValue('full_name', data?.name);
            setImage([data?.picture]);
          }}
          useOneTap
        />
      </Box>
      <Box display='flex' justifyContent='center'>
        <DialogContentText variant='caption'>
          Already have an account?
        </DialogContentText>
        <DialogContentText
          sx={{ cursor: 'pointer' }}
          variant='caption'
          onClick={() => {
            setOpenSignIn(true);
            setOpenSignUp(false);
            reset();
          }}
        >
          <b>Sign In</b>
        </DialogContentText>
      </Box>
    </DialogContainer>
  );
};

export default SignUp;
