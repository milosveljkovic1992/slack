import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ChannelType } from 'components/channel/channel.types';

const initialState: ChannelType = {
  id: 'general',
  name: 'general',
};

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    enterChannel(state, action: PayloadAction<ChannelType>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    leaveChannel(state) {
      state.id = initialState.id;
      state.name = initialState.name;
    },
  },
});

export const { enterChannel, leaveChannel } = channelSlice.actions;

export default channelSlice;
