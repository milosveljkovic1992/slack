import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'firebase-config';

import { RootState } from 'store';

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
  'user/register',
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

interface AddUserToChannel {
  user: UserType;
  workplaceId: string;
  channelId: string;
}

export const addUserToChannel = createAsyncThunk(
  'user/addToChannel',
  async ({ workplaceId, channelId }: AddUserToChannel, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { id } = state.user;

    try {
      await setDoc(
        doc(db, 'workplaces', workplaceId, 'channels', channelId, 'users', id),
        {
          ...state.user,
        },
      );
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
      state.email = initialState.email;
      state.id = initialState.id;
      state.lastActiveDate = initialState.lastActiveDate;
      state.lastActiveTime = initialState.lastActiveTime;
      state.phone = initialState.phone;
      state.profileImage = initialState.profileImage;
      state.role = initialState.role;
      state.status = initialState.status;
      state.username = initialState.username;
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
