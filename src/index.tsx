import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Theme } from 'global/Theme';
import 'index.css';

import store from 'store';

import { App } from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Theme>
        <App />
      </Theme>
    </Provider>
  </StrictMode>,
);
