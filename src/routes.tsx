import { createBrowserRouter } from 'react-router-dom';

import { App } from 'App';
import { Channel, LoginModal, SignUpModal } from 'components';
import { Workplace } from 'pages/workplace';
import { LandingPageLoggedOut } from 'pages/landing-page-logged-out';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Not found</h1>,
    children: [
      {
        path: '/',
        element: <LandingPageLoggedOut />,
        children: [
          {
            path: '/sign-up',
            element: <SignUpModal />,
          },
          {
            path: '/log-in',
            element: <LoginModal />,
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
