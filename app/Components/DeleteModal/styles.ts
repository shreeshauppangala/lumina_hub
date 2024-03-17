import { Dialog, styled } from '@mui/material';

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root': {
    width: theme.spacing(150),
    padding: theme.spacing(12, 16),
    borderRadius: theme.spacing(8),
    backgroundColor: theme.palette.common.white,

    '.MuiDialogTitle-root': {
      padding: theme.spacing(0),
      marginBottom: theme.spacing(4),
    },

    '.MuiDialogContent-root': {
      padding: theme.spacing(0),
      margin: `${theme.spacing(6)} 0`,
    },

    '.MuiDialogActions-root ': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
}));
