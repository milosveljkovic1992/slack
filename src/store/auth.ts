import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  authenticated: boolean;
}

const initialState: InitialState = {
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.authenticated = true;
    },
    logout(state) {
      state.authenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice;
