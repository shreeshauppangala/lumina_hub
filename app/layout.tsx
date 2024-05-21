import { ReactNode } from 'react';
import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Lumina Hub',
  icons: './favicon.ico',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { CustomMuiThemeProvider } = muiCustomTheme;
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <CustomMuiThemeProvider>
          <ContextContainer>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!}
            >
              <Header />
              <Box mt={42} minHeight='65vh'>
                {children}
              </Box>
              <Footer />
            </GoogleOAuthProvider>
          </ContextContainer>
        </CustomMuiThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
