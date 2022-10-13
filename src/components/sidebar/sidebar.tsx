import { Box as MUIBox } from '@mui/material';
import { styled } from '@mui/material/styles';

const Box = styled(MUIBox)(({ theme }) => ({
  width: '220px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: '10px 20px',
}));

export const Sidebar = () => {
  return <Box>Sidebar</Box>;
};
