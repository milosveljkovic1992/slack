import { ReactNode } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinkProps } from '@mui/material/Link';
import { Typography } from '@mui/material';

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
    fontFamily: '"Helvetica Neue", Helvetica, Segoe UI, Roboto',
    h1: {
      fontSize: '3rem',
      lineHeight: 2,
    },
    h2: {
      fontSize: '2.25rem',
      lineHeight: 2,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
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
    body1: {
      fontSize: '15px',
    },
    body2: {
      fontSize: '1rem',
    },
  },
  transitions: {
    duration: {
      standard: 150,
    },
  },
});

interface TypographyProps {
  children: ReactNode;
  [x: string]: any;
  variant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
}

export const H1 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h1" variant={variant || 'h1'} {...restProps}>
      {children}
    </Typography>
  );
};

export const H2 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h2" variant={variant || 'h2'} {...restProps}>
      {children}
    </Typography>
  );
};

export const H3 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h3" variant={variant || 'h3'} {...restProps}>
      {children}
    </Typography>
  );
};

export const H4 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h4" variant={variant || 'h4'} {...restProps}>
      {children}
    </Typography>
  );
};

export const H5 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h5" variant={variant || 'h5'} {...restProps}>
      {children}
    </Typography>
  );
};

export const H6 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="h6" variant={variant || 'h6'} {...restProps}>
      {children}
    </Typography>
  );
};

export const P = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="p" variant={variant || 'body1'} {...restProps}>
      {children}
    </Typography>
  );
};

export const P2 = ({ variant, children, ...restProps }: TypographyProps) => {
  return (
    <Typography component="p" variant={variant || 'body2'} {...restProps}>
      {children}
    </Typography>
  );
};

export const Subtitle1 = ({
  variant,
  children,
  ...restProps
}: TypographyProps) => {
  return (
    <Typography component="p" variant={variant || 'subtitle1'} {...restProps}>
      {children}
    </Typography>
  );
};

export const Subtitle2 = ({
  variant,
  children,
  ...restProps
}: TypographyProps) => {
  return (
    <Typography component="p" variant={variant || 'subtitle2'} {...restProps}>
      {children}
    </Typography>
  );
};

export const Overline = ({
  variant,
  children,
  ...restProps
}: TypographyProps) => {
  return (
    <Typography component="p" variant={variant || 'overline'} {...restProps}>
      {children}
    </Typography>
  );
};

export const Theme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
