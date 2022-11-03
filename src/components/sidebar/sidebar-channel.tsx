import { Grid } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarChannelProps {
  icon: ReactNode;
  children: string;
}

export const SidebarChannel = ({ icon, children }: SidebarChannelProps) => {
  return (
    <Grid container width="100%">
      <Grid item display="flex" height="28px" alignItems="center" mr={1}>
        {icon}
      </Grid>
      <Grid item display="flex" lineHeight="26px" alignItems="center">
        {children}
      </Grid>
    </Grid>
  );
};
