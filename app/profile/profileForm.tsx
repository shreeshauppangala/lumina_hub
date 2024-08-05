import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { SignUpFormDataI } from '../constants/interfaces';
import { DropZone, InputField, SearchableDropdown } from '../Components';
import { pattern } from '../constants';
import { GreyCrossEye, GreyEye } from '../Assets/Icons';
import { hooks } from '../hooks';

interface PropsI {
  formData: SignUpFormDataI | undefined;
}
const ProfileForm = ({ formData }: PropsI) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState<File[] | string[]>([]);

  const { isProfileUpdating, onUpdateProfile } = hooks.useAuth();

  const { getStates, getCity } = hooks.useMisc();

  const router = useRouter();

  const { control, handleSubmit, reset, getValues, watch } =
    useForm<SignUpFormDataI>({
      mode: 'all',
      defaultValues: formData,
    });

  useEffect(() => {
    if (formData?.picture) {
      setImage([formData?.picture as string]);
    }
  }, [formData]);

  const onSubmit = (data: SignUpFormDataI) => {
    const { state, city } = data;

    onUpdateProfile({
      ...data,
      city: city?.value!,
      state: state?.value!,
    });
  };

  return (
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
                disabled
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
              pattern: {
                value: pattern.strongPassword,
                message: `Password minimum length should be 8 and should include one lowercase,
                one uppercase, one digit and one special character`,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type={showPassword ? 'text' : 'password'}
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
              validate: (value) =>
                value !== getValues('password')
                  ? 'Password did not match'
                  : undefined,
            }}
            render={({ field, fieldState: { error } }) => (
              <InputField
                type={showConfirmPassword ? 'text' : 'password'}
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
              pattern: { value: pattern.pinCode, message: 'Invalid Pin code' },
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
        <Box display='flex' justifyContent='end' gap={10}>
          <LoadingButton
            loading={isProfileUpdating}
            variant='contained'
            color='primary'
            type='submit'
          >
            update
          </LoadingButton>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              reset();
              router.back();
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ProfileForm;
