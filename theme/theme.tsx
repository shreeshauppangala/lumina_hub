'use client'

import React, { ReactElement, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';


/**
 * Changes the padding values based on the size of the owner state.
 * @returns {string} - the new padding values
 */
const changePaddingValues = (size: 'small' | 'medium' | 'large' | undefined) => {
  if (size === 'small') {
    return '8px 12px';
  }
  if (size === 'medium') {
    return '12px 16px';
  }
  if (size === 'large') {
    return '12px';
  }
  return '4px 15px';
};

/**
 * An object representing the styles for a button.
 * @type {Object}
 * @property {number} fontWeight - The weight of the font for the button.
 * @property {string} lineHeight - The height of each line of text within the button.
 */
const buttonStyles = {
  fontWeight: 500,
  lineHeight: '20px',
};

export const theme = createTheme({

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' &&
            ownerState.variant === 'contained' && {
            ...buttonStyles,
            textTransform: 'initial',
            padding: changePaddingValues(ownerState.size),
            fontSize: ownerState.size === 'small' ? 12 : 16,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderRadius: theme.spacing(12),
            boxShadow:'none',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              border: 'none',
              boxShadow: 'none',
            },
            '&:disabled': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              opacity: 0.5,
              cursor: 'not-allowed',
              pointerEvents: 'auto',
              boxShadow: 'none',
            },
          }),
        }),
      },
    },
  },

  /**
   * Takes in a number and returns the result of multiplying it by 2.
   * @param {number} value - the number to be multiplied by 2
   * @returns The result of multiplying the input value by 2.
   */
  spacing: (value: number) => value * 2,
  /**
   * A typography object that can be used to create typography styles.
   */
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '32px',
      fontWeight: 600,
      lineHeight: '40px',
    },
    h2: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '24px',
    },
    h3: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    h4: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    h5: {
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    h6: {
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '18px',
    },
    button: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
  },
  /**
   * A palette object that can be used to generate CSS color variables.
   */
  palette: {
    primary: {
      light: '#EAFFFD',
      main: '#eb8f1b',
      dark: '#007A6F',
    },
    secondary: {
      light: '#CCE9F0',
      main: '#0093B4',
      dark: '#A3CFBB',
    },
    success: {
      main: '#22C55E',
      light: '#DCFCE7',
      dark: '#16A34A',
    },
    error: {
      main: '#EF4444',
      light: '#FFE5E6',
    },
    warning: {
      main: '#DE350B',
    },
    info: {
      main: '#2F80ED',
    },
  },
});

/**
 * A custom Material UI theme provider that can be used to override the default theme.
 * @param {ReactNode} props - The props to pass to the theme provider.
 * @returns {ReactElement} - The custom theme provider.
 */
export const CustomMuiThemeProvider = ({ children }: { children: ReactNode }): ReactElement => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
