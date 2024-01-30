'use client'

import { AppBar, Box, Button, Toolbar, styled } from "@mui/material";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: 'none',
  borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.grey[200]}`,
  padding: theme.spacing(5),
}));

const CustomToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'end'
}));

const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
  '&:hover': {
    backgroundColor: theme.palette.common.white, color: theme.palette.grey[700],
    boxShadow: `${theme.spacing(0, 1, 2)} rgba(3,3,3,0.1)`,
    border: 'none',
  },
}))

const Home = () => (
  <Box>
    <CustomAppBar position='fixed'>
      <CustomToolbar>
        <Box display='flex' gap={12}>
          <Button color="primary" variant='contained'>Sign Up</Button>
          <SignInButton variant="contained">Sign In</SignInButton>
        </Box>
      </CustomToolbar>
    </CustomAppBar>
  </Box>
);

export default Home