import { App } from 'App';
import { Channel } from 'components';
import { Workplace } from 'pages/workplace';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Not found</h1>,
    children: [
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
