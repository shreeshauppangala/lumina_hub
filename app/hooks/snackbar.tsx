import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Snackbar, Alert, styled, AlertColor } from '@mui/material';

type SnackBarContextActions = {
  ShowSuccessSnackBar: (text: string) => void;
  ShowApiErrorSnackBar: (err: any) => void;
  ShowErrorSnackBar: (text: string) => void;
  ShowCautionSnackBar: (text: string) => void;
  ShowApiInfoSnackBar: (err: any) => void;
  ShowInfoSnackBar: (text: string) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: ReactNode;
}

const SnackBarProvider = ({ children }: SnackBarContextProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [typeColor, setTypeColor] = useState<AlertColor>('info');

  /**
   * Shows a snackbar with the given text and color.
   * @param {string} text - the text to show in the snackbar.
   * @param {AlertColor} colorType - the color of the snackbar.
   * @returns None
   */
  const showSnackBar = (text: string, colorType: AlertColor) => {
    setMessage(text);
    setTypeColor(colorType);
    setOpen(true);
  };

  /**
   * Shows a success snackbar with the given text.
   * @param {string} text - the text to show in the snackbar.
   * @returns None
   */
  const ShowSuccessSnackBar = (text: string) => {
    showSnackBar(text, 'success');
  };
  /**
   * Shows a snackbar with the given text.
   * @param {string} text - the text to show in the snackbar.
   * @returns None
   */
  const ShowErrorSnackBar = (text: string) => {
    showSnackBar(text, 'error');
  };
  /**
   * Shows a snackbar with the given text.
   * @param {string} text - the text to show in the snackbar.
   * @returns None
   */
  const ShowInfoSnackBar = (text: string) => {
    showSnackBar(text, 'info');
  };

  /**
   * Shows a snackbar with the given text.
   * @param {string} text - the text to show in the snackbar.
   * @returns None
   */
  const ShowCautionSnackBar = (text: string) => {
    showSnackBar(text, 'warning');
  };

  /**
   * Displays an error message in a snackbar based on the given error object.
   * @param err - The error object to display.
   * @returns None
   */
  const ShowApiErrorSnackBar = (err: any) => {
    const result: any = {};
    /**
     * Iterates through the keys of the error response data object and adds any non-empty
     * values to the result object.
     * @param err - the error object containing the response data
     * @returns An object containing the non-empty values from the error response data object.
     */
    Object.keys(err.response.data).forEach((item) => {
      if (err.response.data[item].length > 0) {
        result[item] = err.response.data[item];
      }
    });
    const error =
      Object.values(result).join().length > 0
        ? Object.values(result).join()
        : err.response.data.meta.message;

    showSnackBar(error, 'error');
  };

  /**
   * Shows a snackbar with the given message.
   * @param {string} err - the message to show in the snackbar.
   * @returns None
   */
  const ShowApiInfoSnackBar = (err: any) => {
    if (err.response.data) {
      ShowInfoSnackBar(err.response.data.message);
    } else ShowInfoSnackBar("Something went wrong. We're looking to see what happened!");
  };

  /**
   * A styled component that can be used to style the alert component.
   * @param {Theme} theme - The theme object.
   * @returns {CSSObject} The CSS object.
   */
  const CustomAlert = styled(Alert)(({ theme, severity }) => {
    const severityToPalette = {
      error: theme.palette.error.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      info: theme.palette.info.main,
    };
    const backgroundColor = severityToPalette[severity!];
    return {
      ...theme.typography.h5,
      backgroundColor,
      color: theme.palette.common.white,
      '.MuiSvgIcon-root': {
        color: theme.palette.common.white,
      },
    };
  });

  /**
   * A hook that returns a set of functions that can be used to show different types of snack bars.
   * @returns {object} - an object containing the functions that can be used to show different types of snack bars.
   */
  const value = useMemo(
    () => ({
      ShowSuccessSnackBar,
      ShowApiErrorSnackBar,
      ShowErrorSnackBar,
      ShowCautionSnackBar,
      ShowApiInfoSnackBar,
      ShowInfoSnackBar,
    }),
    [],
  );
  return (
    <SnackBarContext.Provider value={value}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setOpen(false)}
      >
        <CustomAlert severity={typeColor}>{message}</CustomAlert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
