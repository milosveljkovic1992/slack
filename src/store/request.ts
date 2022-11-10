import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  status: 'completed' | 'pending' | 'rejected' | null;
  message: string;
}

const initialState: InitialState = {
  status: null,
  message: '',
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    submitRequest(state) {
      (state.status = 'pending'), (state.message = 'Loading...');
    },
    resolveRequest(state) {
      (state.status = 'completed'), (state.message = 'Success!');
    },
    rejectRequest(state) {
      state.status = 'rejected';
      state.message = 'Error. Please try again...';
    },
    resetStatus(state) {
      state.status = null;
      state.message = '';
    },
  },
});

export const { submitRequest, resolveRequest, rejectRequest, resetStatus } =
  requestSlice.actions;

export default requestSlice;
