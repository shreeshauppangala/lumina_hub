// CheckoutForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, styled } from '@mui/material';
import { useForm } from 'react-hook-form';

export const PaymentContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(10),
  width: '100%',
  '.checkout_button': {
    ...theme.typography.button,
    color: theme.palette.grey[700],
    borderRadius: theme.spacing(12),
    textTransform: 'initial',
    padding: theme.spacing(6, 8),
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      border: 'none',
      boxShadow: 'none',
      backgroundColor: theme.palette.common.white,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'auto',
      boxShadow: 'none',
      color: theme.palette.grey[700],
      backgroundColor: theme.palette.common.white,
    },
  },
}));

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { handleSubmit } = useForm({
    mode: 'all',
  });

  const onSubmit = async () => {
    const cardElement = elements?.getElement(CardElement);
    if (stripe) {
      const { token, error } = await stripe.createToken(cardElement!);
      if (error) {
        return error;
      }
      return token;
    }
    return undefined;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PaymentContainer>
        <CardElement />
        <Button
          type='submit'
          disabled={!stripe}
          className='checkout_button'
          variant='contained'
        >
          Proceed to Buy
        </Button>
      </PaymentContainer>
    </form>
  );
};

export default CheckoutForm;
