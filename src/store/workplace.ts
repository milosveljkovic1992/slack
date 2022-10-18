import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ChannelType } from 'components/channel/channel.types';

export type WorkplaceType = {
  id: string;
  name: string;
  channels: ChannelType[];
};

const initialState: WorkplaceType = {
  id: '',
  name: '',
  channels: [],
};

const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
    setWorkplace(state, action: PayloadAction<WorkplaceType>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.channels = action.payload.channels;
    },
    resetWorkplace(state) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.channels = initialState.channels;
    },
  },
});

export const { setWorkplace, resetWorkplace } = workplaceSlice.actions;

export default workplaceSlice;
