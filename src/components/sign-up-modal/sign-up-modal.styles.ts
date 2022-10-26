import { Box as MUIBox, Input as MUIInput, styled } from '@mui/material';

export const Background = styled(MUIBox)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  opacity: 0.3,
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

  transition: '0.15s ease-in-out',
  opacity: 0,
  transform: 'scale(0.7)',

  '&.fade-in': {
    opacity: 1,
  },

  '&.zoom-in': {
    transform: 'scale(1)',
  },

  '& > .inner-container': {
    minHeight: '30vh',
    width: '90%',
    maxWidth: '768px',
    padding: '40px 10px 50px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid #777',
    borderRadius: '4px',
    backdropFilter: 'blur(3px)',

    '& > h1': {
      textAlign: 'center',
      marginTop: 0,
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
