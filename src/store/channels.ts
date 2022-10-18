import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ChannelType } from 'components/channel/channel.types';

interface InitialState {
  [key: string]: ChannelType;
}

const initialState: InitialState = {};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addSingleChannel(state, action: PayloadAction<ChannelType>) {
      const { id } = action.payload;
      state[id] = action.payload;
    },
    addBulkChannels(state, action: PayloadAction<ChannelType[]>) {
      action.payload.forEach((channel) => {
        state[channel.id] = channel;
      });
    },
    deleteChannel(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { addSingleChannel, addBulkChannels, deleteChannel } =
  channelsSlice.actions;

export default channelsSlice;
