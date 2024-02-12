import { ReactNode, StrictMode } from 'react';
import { Roboto } from 'next/font/google';
import { Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as muiCustomTheme from '@/app/theme/theme';
import * as snack from '@/app/hooks/snackbar';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import ContextContainer from './context';
import './globals.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { CustomMuiThemeProvider } = muiCustomTheme;
  /**
   * Destructures the SnackBarProvider object from the snack module.
   * @returns The SnackBarProvider object for displaying snack bars.
   */
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
    <html lang='en'>
      <body className={roboto.className}>
        <StrictMode>
          <CustomMuiThemeProvider>
            <QueryClientProvider client={queryClient}>
              <SnackBarProvider>
                <GoogleOAuthProvider clientId='849890460675-3o04iv7ipvdlbt8hamn98724pb27t530.apps.googleusercontent.com'>
                  <ContextContainer>
                    <Header />
                    <Box mt={42}>{children}</Box>
                    <Footer />
                  </ContextContainer>
                </GoogleOAuthProvider>
              </SnackBarProvider>
            </QueryClientProvider>
          </CustomMuiThemeProvider>
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
