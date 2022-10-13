import { Box as MUIBox } from '@mui/material';
import { styled } from '@mui/material/styles';

const Box = styled(MUIBox)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}));

export const Header = () => {
  return <Box>Header</Box>;
};
