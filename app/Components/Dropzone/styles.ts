import { Avatar, Box, styled } from '@mui/material';

export const DropZoneWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10),
  boxShadow: '0px 2px 8px rgba(64,60,67,0.24)',
  borderRadius: theme.spacing(12),

  '.dropzone': {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(10),
    border: `${theme.spacing(0.5)} dashed ${theme.palette.grey[700]}`,
    cursor: 'pointer',
    width: '100%',
    ':hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  '.preview_box': {
    display: 'grid',
    gap: theme.spacing(5),
    '.file': {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(8),
      padding: theme.spacing(2.5),
    },
    '.file_name': {
      ...theme.typography.caption,
      color: theme.palette.grey[600],
    },
    '.image_box': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(2.5),
      borderRadius: theme.spacing(8),
      width: 'fit-content',
      '.only_image_preview': {
        width: theme.spacing(100),
        height: theme.spacing(100),
      },
    },
  },
}));

export const CustomAvatar = styled(Avatar)(() => ({
  backgroundColor: 'transparent',
  '.MuiSvgIcon-root': {
    display: 'none',
  },
}));
