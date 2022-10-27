import { Box, styled } from '@mui/material';

import { H1, P } from 'global/Theme';

import { WorkplacesList } from 'components/workplaces-list/workplaces-list';

const Container = styled(Box)(() => ({
  backgroundColor: 'red',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

const InnerContainer = styled(Box)(() => ({
  backgroundColor: 'white',
  width: '100%',
  maxWidth: '1024px',
  height: '100%;',
  minHeight: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px 0',

  '& > header': {
    textAlign: 'center',

    '& > h1': {
      margin: 0,
    },
  },
}));

export const LandingPage = () => {
  return (
    <Container>
      <InnerContainer>
        <header>
          <H1 variant="h3">Welcome back! Everyone&apos;s waiting on you!</H1>
          <P>Choose a workspace below to get back to working with your team.</P>
        </header>
        <Box width="90%" maxWidth="600px" mt={5}>
          <WorkplacesList />
        </Box>
      </InnerContainer>
    </Container>
  );
};
