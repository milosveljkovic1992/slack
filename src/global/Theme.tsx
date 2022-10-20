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
});

export const Theme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
