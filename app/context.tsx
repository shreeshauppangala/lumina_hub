'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as muiCustomTheme from '@/app/theme/theme';
import * as snack from '@/app/hooks/snackbar';
import { hooks } from './hooks';

const ContextContainer = ({ children }: { children: ReactNode }) => {
  const { CustomMuiThemeProvider } = muiCustomTheme;

  const { SnackBarProvider } = snack;

  /**
   * Calculates the number of milliseconds in twenty-four hours.
   * @returns {number} The number of milliseconds in twenty-four hours.
   */
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  /**
   * Creates a new instance of QueryClient with default options for queries.
   * @param {Object} options - The options for the QueryClient instance.
   * @param {Object} options.defaultOptions - The default options for queries.
   * @param {boolean} options.defaultOptions.queries.refetchOnWindowFocus
   *  - Whether to refetch queries when the window regains focus.
   * @param {boolean} options.defaultOptions.queries.refetchOnMount - Whether to refetch queries when the component mounts.
   * @param {boolean} options.defaultOptions.queries.refetchOnReconnect - Whether to refetch queries when the network reconnects.
   * @param {boolean} options.defaultOptions.queries.retry - Whether to retry failed queries.
   *
   */
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });
  return (
    <CustomMuiThemeProvider>
      <SnackBarProvider>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!}>
            <hooks.ProvideAuth>
              <hooks.ProvideOrders>{children}</hooks.ProvideOrders>
            </hooks.ProvideAuth>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </SnackBarProvider>
    </CustomMuiThemeProvider>
  );
};

export default ContextContainer;
