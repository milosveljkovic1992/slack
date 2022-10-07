import { Channel, Header, Sidebar } from 'components';
import { Box } from '@mui/system';

const PageLayoutStyle = {
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '5vh 1fr',
};

export const App = () => {
  return (
    <Box sx={PageLayoutStyle}>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <Channel />
      </Box>
    </Box>
  );
};
