import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { App } from 'App';
import { Channel } from 'components';
import { Workplace } from 'pages/workplace';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found</h1>}>
      <Route path="/:workplaceId" element={<Workplace />}>
        <Route path=":channelId" element={<Channel />} />
      </Route>
    </Route>,
  ),
);
