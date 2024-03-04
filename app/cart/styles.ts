import { Box, styled } from '@mui/material';
import { StylesConfig } from 'react-select';
import { theme } from '../theme/theme';

export const CartContainer = styled(Box)(() => ({
  padding: theme.spacing(15, 10),

  '.products_card': {
    flex: 2,
    padding: theme.spacing(15),
    borderRadius: theme.spacing(12),
    boxShadow: '0px 2px 10px rgba(3,3,3,0.1)',

    '.select_all_button': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,

      ':hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  '.payments_card': {
    flex: 1,
    padding: theme.spacing(15),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: theme.spacing(12),
    height: 'fit-content',
  },

  '.product_image': {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

export const quantityDropdown: StylesConfig = {
  control: (base) => ({
    ...base,
    minHeight: 'unset',
    minWidth: 'unset',
    borderRadius: theme.spacing(12),
    boxShadow: 'unset',
    width: theme.spacing(60),
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: theme.spacing(2),
    transform: state.selectProps.menuIsOpen
      ? 'rotate(180deg) translate(0, 0)'
      : 'none',
  }),
};
