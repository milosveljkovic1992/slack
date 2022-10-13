import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Role {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  Member = 'MEMBER',
  Bot = 'BOT',
}

export enum Status {
  Active = 'ACTIVE',
  Away = 'AWAY',
  Busy = 'BUSY',
  Offline = 'OFFLINE',
}

export type UserType = {
  email: string;
  id: string;
  lastActiveDate: string;
  lastActiveTime: number;
  phone: string;
  profileImage: string;
  role: Role;
  status: Status;
  username: string;
};

interface InitialState {
  [key: string]: UserType;
}

const initialState: InitialState = {};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserType>) {
      const { id } = action.payload;
      state[id] = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;

export default usersSlice;
