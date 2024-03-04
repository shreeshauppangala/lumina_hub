'use client';

import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { hooks } from '../hooks';
import ProfileForm from './profileForm';

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 10),
}));

const Profile = () => {
  const { UseGetProfileData } = hooks.useAuth();

  const { data, isLoading } = UseGetProfileData();

  const formData = {
    ...data!,
    confirm_password: '' as string & { length: { gte: 8 } },
    termsAgreement: true,
  };

  return (
    <ProfileContainer>
      {isLoading ? <Typography>loading</Typography> : <ProfileForm formData={formData!} />}
    </ProfileContainer>
  );
};

export default Profile;
