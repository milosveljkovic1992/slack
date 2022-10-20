import { Box as MUIBox, Input as MUIInput, styled } from '@mui/material';

export const Background = styled(MUIBox)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  opacity: 0.2,
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}));

export const Container = styled(MUIBox)(() => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > .inner-container': {
    minHeight: '50vh',
    width: '90%',
    maxWidth: '768px',
    padding: '30px 10px',
    backgroundColor: '#fff',

    '& > h1': {
      textAlign: 'center',
    },

    '& > form': {
      width: '80%',
      margin: '0 auto',

      '& > .input-box': {
        marginTop: '20px',

        '& > label': {
          cursor: 'pointer',
          userSelect: 'none',
        },
      },
    },
  },
}));

export const Input = styled(MUIInput)(() => ({
  display: 'block',
  marginBottom: '40px',
}));
