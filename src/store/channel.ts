import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChannelType = {
  id: string;
  name: string;
};

const initialState: ChannelType = {
  id: '',
  name: '',
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
