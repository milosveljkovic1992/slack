import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

import { setWorkplace, WorkplaceType } from 'store/workplace';
import { useAppDispatch } from 'store';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Header, Sidebar } from 'components';

const PageLayout = styled(Box)(() => ({
  height: '100vh',
  display: 'grid',
  gridTemplateRows: '5vh 1fr',
  overflow: 'hidden',
}));

export const Workplace = () => {
  const workplaceId = 'mivel';
  const dispatch = useAppDispatch();

  const fetchWorkplace = async () => {
    const workplaceRef = doc(db, 'workplaces', workplaceId);
    const workplaceSnap = await getDoc(workplaceRef);
    const workplaceData = workplaceSnap.data() as WorkplaceType;
    dispatch(setWorkplace(workplaceData));
  };

  useEffect(() => {
    const controller = new AbortController();

    fetch('', { signal: controller.signal })
      .then(() => fetchWorkplace())
      .catch(() => null);

    return () => controller.abort();
  }, []);

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
