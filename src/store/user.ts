import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

import { addSingleUser } from './users';

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
  lastActiveTime: string;
  phone: string;
  profileImage: string;
  role: Role;
  status: Status;
  username: string;
};

const initialState: UserType = {
  email: '',
  id: '',
  lastActiveDate: '',
  lastActiveTime: '',
  phone: '',
  profileImage: '',
  role: Role.Member,
  status: Status.Active,
  username: '',
};

export const registerNewUser = createAsyncThunk(
  'user/sync',
  async (user: UserType, thunkAPI) => {
    const { id } = user;
    try {
      await setDoc(doc(db, 'users', id), {
        ...user,
      });
      addSingleUser(user);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state = action.payload;
    },
    resetUser(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      registerNewUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state = action.payload;
      },
    );
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice;
