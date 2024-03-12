'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as snack from '@/app/hooks/snackbar';
import { hooks } from './hooks';

const ContextContainer = ({ children }: { children: ReactNode }) => {
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
    <SnackBarProvider>
      <QueryClientProvider client={queryClient}>
        <hooks.ProvideMisc>
          <hooks.ProvideAuth>
            <hooks.ProvideOrders>{children}</hooks.ProvideOrders>
          </hooks.ProvideAuth>
        </hooks.ProvideMisc>
      </QueryClientProvider>
    </SnackBarProvider>
  );
};

export default ContextContainer;
