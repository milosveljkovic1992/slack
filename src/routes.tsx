import { createBrowserRouter } from 'react-router-dom';

import { App } from 'App';
import { Channel } from 'components';
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
