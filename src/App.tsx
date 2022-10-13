import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Channel, Header, Sidebar } from 'components';

const PageLayout = styled(Box)(() => ({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '5vh 1fr',
  overflow: 'hidden',
}));

export const App = () => {
  return (
    <PageLayout>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <Channel />
      </Box>
    </PageLayout>
  );
};
