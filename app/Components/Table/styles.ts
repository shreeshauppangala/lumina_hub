import { Box, styled } from '@mui/material';
import { theme } from '@/app/theme/theme';

export const PaginationContainer = styled(Box)(() => ({
  width: '100%',
  padding: theme.spacing(6, 12),
  borderRadius: theme.spacing(0, 0, 4, 4),
  alignItems: 'center',
}));

export const headRow = {
  style: {
    padding: theme.spacing(6, 0),
    color: theme.palette.grey[600],
  },
};

export const headCells = {
  style: {
    ...theme.typography.h5,
  },
};

export const rowStyles = {
  padding: theme.spacing(8, 0),
  ':not(:last-of-type)': {
    borderBottom: 0,
  },
};

export const cells = {
  style: {
    ...theme.typography.body2,
  },
};

export const progress = {
  style: {
    backgroundColor: 'transparent',
  },
};

export const noData = {
  style: {
    ...theme.typography.h1,
    backgroundColor: 'transparent',
  },
};
