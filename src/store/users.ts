import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { UserType } from './user';

interface InitialState {
  [key: string]: UserType;
}

const initialState: InitialState = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserType[]>) {
      action.payload.forEach((user) => {
        const { id } = user;
        if (state[id] === undefined) state[id] = user;
      });
    },
    resetUsers(state) {
      for (const key in state) {
        delete state[key];
      }
    },
    addSingleUser(state, action: PayloadAction<UserType>) {
      const { id } = action.payload;
      if (state[id] === undefined) state[id] = action.payload;
    },
    updateSingleUser(state, action: PayloadAction<UserType>) {
      const { id } = action.payload;
      state[id] = action.payload;
    },
    removeSingleUser(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const {
  setUsers,
  resetUsers,
  addSingleUser,
  updateSingleUser,
  removeSingleUser,
} = usersSlice.actions;

export default usersSlice;
