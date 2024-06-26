import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Dialog, Typography, styled } from '@mui/material';

export const DetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 10),
}));

export const ListedImages = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(30),
  height: theme.spacing(40),
}));

export const PreviewImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(233),
  height: theme.spacing(262),
}));

export const PriceText = styled(Typography)(({ theme }) => ({
  ...theme.typography.h4,
  boxShadow: '0px 2px 4px rgba(3,3,3,0.1)',
  borderRadius: theme.spacing(12),
  padding: theme.spacing(5, 10),
  color: theme.palette.grey[600],
}));

export const AddToCart = styled(LoadingButton)(({ theme }) => ({
  ...theme.typography.subtitle2,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  padding: theme.spacing(3, 8),
  borderRadius: theme.spacing(12),
  '&:hover': {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[700],
    boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
    border: 'none',
  },
}));

export const CheckoutDialogContainer = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root': {
    width: '50%',
    padding: theme.spacing(12, 16),
    borderRadius: theme.spacing(8),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,

    '.MuiDialogTitle-root': {
      padding: theme.spacing(0),
      marginBottom: theme.spacing(14),
    },

    '.MuiDialogContent-root': {
      ...theme.typography.caption,
      padding: theme.spacing(0),
      marginBottom: theme.spacing(6),

      '.product_image': {
        width: theme.spacing(40),
        height: theme.spacing(40),
      },
    },
  },
}));

export const NotFoundContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(5, 10),
  paddingBottom: 0,

  '.title': {
    ...theme.typography.h1,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(10),
  },

  '.content': {
    ...theme.typography.body1,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(10),
  },
}));
