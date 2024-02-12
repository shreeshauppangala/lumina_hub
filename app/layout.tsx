import { ReactNode, StrictMode } from 'react';
import { Roboto } from 'next/font/google';
import { Box } from '@mui/material';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import ContextContainer from './context';
import './globals.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body className={roboto.className}>
      <StrictMode>
        <ContextContainer>
          <Header />
          <Box mt={42}>{children}</Box>
          <Footer />
        </ContextContainer>
      </StrictMode>
    </body>
  </html>
);

export default RootLayout;
