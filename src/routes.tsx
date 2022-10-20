import { App } from 'App';
import { Channel } from 'components';
import { Workplace } from 'pages/workplace';
import { LandingPage } from 'pages/landing-page';
import { createBrowserRouter } from 'react-router-dom';
import { SignUpModal } from 'components/sign-up-modal/sign-up-modal';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Not found</h1>,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        children: [
          {
            path: '/sign-up',
            element: <SignUpModal />,
          },
        ],
      },
      {
        path: '/:workplaceId',
        element: <Workplace />,
        children: [
          {
            path: ':channelId',
            element: <Channel />,
          },
        ],
      },
    ],
  },
]);
