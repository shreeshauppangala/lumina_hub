import { ReactNode, StrictMode } from 'react'
import { Roboto } from 'next/font/google'
import { Box } from '@mui/material'
import * as muiCustomTheme from '@/app/theme/theme'
import './globals.scss'
import Footer from './Components/Layout/Footer'
import Header from './Components/Layout/Header'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"]
})


const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => {

  const { CustomMuiThemeProvider } = muiCustomTheme;
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StrictMode>
          <CustomMuiThemeProvider>
            <Header />
            <Box mt={42}>{children}</Box>
            <Footer/>
          </CustomMuiThemeProvider>
        </StrictMode>
      </body>
    </html>
  )
}

export default RootLayout