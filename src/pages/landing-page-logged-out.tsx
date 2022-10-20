import { Box, Button, Grid, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const LandingPageLoggedOut = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUpButton = () => {
    navigate('/sign-up');
  };

  const handleLogInButton = () => {
    navigate('/log-in');
  };

  if (location.pathname === '/sign-up') {
    if (!document.getElementById('signup-modal')) {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'signup-modal');
      document.body.appendChild(modalRoot);
    }
  }

  if (location.pathname === '/log-in') {
    if (!document.getElementById('login-modal')) {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'login-modal');
      document.body.appendChild(modalRoot);
    }
  }

  const signupModalRoot = document.getElementById('signup-modal');
  const loginModalRoot = document.getElementById('login-modal');

  return (
    <>
      <Box height="100vh" display="flex" alignItems="center">
        <Grid container height="80vh">
          <Grid item xs={12}>
            <Typography variant="h1" component="h1" textAlign="center">
              Slacky
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSignUpButton}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleLogInButton}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {signupModalRoot && createPortal(<Outlet />, signupModalRoot)}
      {loginModalRoot && createPortal(<Outlet />, loginModalRoot)}
    </>
  );
};
