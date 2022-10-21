import { MouseEvent, useState } from 'react';

import { createPortal } from 'react-dom';
import { Box, Button, Grid, Typography } from '@mui/material';

import { LoginModal, SignUpModal } from 'components';

export const LandingPageLoggedOut = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseSignupModal = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.closest('.inner-container')) return;

    setIsSignupModalOpen(false);
    document.getElementById('signup-modal')?.remove();
  };

  const handleCloseLoginModal = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.closest('.inner-container')) return;

    setIsLoginModalOpen(false);
    document.getElementById('login-modal')?.remove();
  };

  if (isSignupModalOpen) {
    if (!document.getElementById('signup-modal')) {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'signup-modal');
      document.body.appendChild(modalRoot);
    }
  }

  if (isLoginModalOpen) {
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
                  onClick={handleOpenSignupModal}
                >
                  Sign up
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleOpenLoginModal}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {signupModalRoot &&
        isSignupModalOpen &&
        createPortal(
          <SignUpModal handleCloseModal={handleCloseSignupModal} />,
          signupModalRoot,
        )}
      {loginModalRoot &&
        isLoginModalOpen &&
        createPortal(
          <LoginModal handleCloseModal={handleCloseLoginModal} />,
          loginModalRoot,
        )}
    </>
  );
};
