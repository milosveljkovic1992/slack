import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WorkplaceType = {
  id: string;
  name: string;
  users: string[];
};

const initialState: WorkplaceType = {
  id: 'mivel',
  name: '',
  users: [],
};

const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,
  reducers: {
    setWorkplace(state, action: PayloadAction<WorkplaceType>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.users = action.payload.users;
    },
    resetWorkplace(state) {
      state.id = initialState.id;
      state.name = initialState.name;
      state.users = initialState.users;
    },
  },
});

export const { setWorkplace, resetWorkplace } = workplaceSlice.actions;

export default workplaceSlice;
