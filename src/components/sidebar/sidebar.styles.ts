import { styled } from '@mui/material/styles';
import { Box, Link as MUILink } from '@mui/material';

export const Link = styled(MUILink)(({ theme }) => ({
  color: '#fff',
  display: 'block',

  '&:hover, &:focus': {
    backgroundColor: theme.palette.primary.dark,
  },

  '&.active': {
    backgroundColor: '#1164A3',
  },
}));

export const SidebarContainer = styled(Box)(({ theme }) => ({
  minWidth: '220px',
  width: 'auto',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,

  '& > *': {
    padding: '0 15px',
  },
}));
