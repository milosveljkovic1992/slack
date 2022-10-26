import { ReactNode } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinkProps } from '@mui/material/Link';

import { LinkBehavior } from 'global/link';

const theme = createTheme({
  palette: {
    primary: {
      light: '#3F0E40',
      main: '#350d36',
      contrastText: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: 'none',
      } as LinkProps,
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      lineHeight: 2,
    },
    h2: {
      fontSize: '2.25rem',
    },
    h3: {
      fontSize: '1.875rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.25rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
});

export const Theme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
