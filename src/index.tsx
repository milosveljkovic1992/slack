import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Theme } from 'global/Theme';
import 'index.css';

import store from 'store';

import { router } from 'routes';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Provider>
  </StrictMode>,
);
