import { ReactNode, StrictMode } from 'react'
import { Roboto } from 'next/font/google'
import './globals.scss'
import * as theme from '@/theme/theme'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900", "100", "300", "400", "500", "700", "900"]
})

const RootLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  const { CustomMuiThemeProvider } = theme;
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StrictMode>
          <CustomMuiThemeProvider>{children}</CustomMuiThemeProvider>
        </StrictMode>
      </body>
    </html>
  )
}

export default RootLayout