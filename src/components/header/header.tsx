import { Box as MUIBox } from '@mui/material';

import { styled } from '@mui/material/styles';
import { LogoutButton } from './logout-button';

const Box = styled(MUIBox)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.dark,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '5px 0',
}));

export const Header = () => {
  return (
    <Box>
      <LogoutButton />
    </Box>
  );
};
