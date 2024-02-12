import { ReactNode, StrictMode } from 'react';
import { Roboto } from 'next/font/google';
import { Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as muiCustomTheme from '@/app/theme/theme';
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
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <StrictMode>
          <CustomMuiThemeProvider>
            <GoogleOAuthProvider clientId='849890460675-3o04iv7ipvdlbt8hamn98724pb27t530.apps.googleusercontent.com'>
              <ContextContainer>
                <Header />
                <Box mt={42}>{children}</Box>
                <Footer />
              </ContextContainer>
            </GoogleOAuthProvider>
          </CustomMuiThemeProvider>
        </StrictMode>
      </body>
    </html>
  );
};

export default RootLayout;
