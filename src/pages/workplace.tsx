import { useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { RootState, useAppDispatch } from 'store';
import { leaveChannel } from 'store/channel';
import { enterWorkplace, leaveWorkplace } from 'store/workplace';

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
  const workplaceParamsId = params['workplaceId'] as string;
  const workplaceId = useSelector((state: RootState) => state.workplace.id);

  useEffect(() => {
    const controller = new AbortController();

    fetch('', { signal: controller.signal })
      .then(() => fetchWorkplace(workplaceParamsId))
      .then((workplace) => dispatch(enterWorkplace(workplace)))
      .catch(() => null);

    return () => {
      controller.abort();
      dispatch(leaveChannel());
      dispatch(leaveWorkplace());
    };
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
