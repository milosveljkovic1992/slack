import { useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useAppDispatch } from 'store';

import { fetchWorkplace } from 'utils/fetchWorkplace';
import { Header, LoadingSpinner, Sidebar } from 'components';

const PageLayout = styled(Box)(() => ({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '5vh 1fr',
  overflow: 'hidden',
}));

export const Workplace = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const workplaceId = params['workplaceId'] as string;

  useEffect(() => {
    const controller = new AbortController();

    fetch('', { signal: controller.signal })
      .then(() => fetchWorkplace(dispatch, workplaceId))
      .catch(() => null);

    return () => controller.abort();
  }, []);

  if (!workplaceId) return <LoadingSpinner />;

  return (
    <PageLayout>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <Outlet />
      </Box>
    </PageLayout>
  );
};
