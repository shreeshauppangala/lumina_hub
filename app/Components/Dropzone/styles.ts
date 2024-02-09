import { Avatar, Box, styled } from '@mui/material';

export const DropZoneWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10),
  border: `${theme.spacing(0.5)} solid ${theme.palette.grey[700]}`,
  borderRadius: theme.spacing(3),

  '.dropzone': {
    padding: theme.spacing(10),
    border: `${theme.spacing(0.5)} dashed ${theme.palette.grey[700]}`,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  '.preview_box': {
    display: 'grid',
    gap: theme.spacing(5),
    marginTop: theme.spacing(15),
    '.file': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(5),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(8),
      padding: theme.spacing(2.5),

      '.file_name': {
        ...theme.typography.caption,
        color: theme.palette.grey[600],
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
