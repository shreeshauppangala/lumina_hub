import { Box, TooltipProps, styled, tooltipClasses, Tooltip } from '@mui/material';

export const OrdersContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 10),
  '.orders_container': {
    display: 'flex',
    gap: theme.spacing(15),
    flexWrap: 'wrap',
    marginTop: theme.spacing(15),
    width: 'fit-content',
    '.order_wrapper ': {
      borderRadius: theme.spacing(12),
      boxShadow: '0px 2px 10px rgba(3,3,3,0.1)',

      '.header': {
        borderRadius: theme.spacing(12, 12, 0, 0),
        padding: theme.spacing(5, 10),
        backgroundColor: theme.palette.primary.light,

        '.heading': { ...theme.typography.h5, color: theme.palette.grey[500] },
        '.detail': { ...theme.typography.subtitle1 },
      },

      '.details_wrapper': {
        borderRadius: theme.spacing(12, 12, 0, 0),
        padding: theme.spacing(10),

        '.product_image': {
          width: theme.spacing(40),
          height: theme.spacing(40),
        },
        '.product_name': {
          ...theme.typography.h4,
          cursor: 'pointer',
          color: theme.palette.primary.main,
          marginLeft: theme.spacing(5),
          ':hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
}));

export const AddressTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    boxShadow: theme.shadows[15],
    padding: theme.spacing(5),
  },
}));
