import { Alert, Snackbar, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { resetStatus } from 'store/request';

export const StatusSnackbar = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useSelector((state: RootState) => state.request);

  const autoHideDuration = 3000;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    dispatch(resetStatus());
  };

  return (
    <Stack>
      <Snackbar
        open={!!status}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {status === 'completed' ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
            elevation={5}
          >
            {message}
          </Alert>
        ) : status === 'rejected' ? (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%' }}
            elevation={5}
          >
            {message}
          </Alert>
        ) : status === 'pending' ? (
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: '100%' }}
            elevation={5}
          >
            {message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Stack>
  );
};
