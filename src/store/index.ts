import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import channelSlice from './channel';
import channelsSlice from './channels';
import userSlice from './user';
import usersSlice from './users';
import workplaceSlice from './workplace';

const store = configureStore({
  reducer: {
    channel: channelSlice.reducer,
    channels: channelsSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    workplace: workplaceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
