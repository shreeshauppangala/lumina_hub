import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DialogContainer } from './styles';

interface PropsI {
  open: boolean;
  setOpen: (openModal: boolean) => void;
  handleDelete: () => void;
  isDeleting: boolean;
}
const DeleteModal = ({ open, setOpen, handleDelete, isDeleting }: PropsI) => (
  <DialogContainer
    open={open}
    onClose={() => {
      setOpen(false);
    }}
  >
    <DialogTitle variant='h2' fontWeight={700}>
      Delete
    </DialogTitle>
    <DialogContent>
      <DialogContentText variant='body1'>
        Are you sure you want to Delete?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <LoadingButton
        fullWidth
        variant='contained'
        onClick={handleDelete}
        loading={isDeleting}
      >
        Yes, Delete
      </LoadingButton>
    </DialogActions>
  </DialogContainer>
);

export default DeleteModal;
