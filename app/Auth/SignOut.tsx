import React from 'react';
import { DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { hooks } from '../hooks';
import { DialogContainer } from './styles';

const SignOut = () => {
  const { logoutModalOpen, setLogoutModalOpen, isSigningOut, onSignOut } = hooks.useAuth();
  return (
    <DialogContainer
      sx={{ '.MuiPaper-root': { width: 300, display: 'grid', gap: 10 } }}
      open={logoutModalOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={() => {
        setLogoutModalOpen(false);
      }}
    >
      <DialogTitle variant='h2'>Sign Out</DialogTitle>
      <DialogContentText variant='body1'> Are you sure you want to Sign out?</DialogContentText>
      <DialogActions>
        <LoadingButton
          onClick={onSignOut}
          loading={isSigningOut}
          variant='contained'
          color='primary'
        >
          Sign Out
        </LoadingButton>
      </DialogActions>
    </DialogContainer>
  );
};

export default SignOut;
