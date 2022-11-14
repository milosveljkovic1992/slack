import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      (state.status = 'pending'), (state.message = 'Processing...');
    },
    resolveRequest(state, action: PayloadAction<string>) {
      (state.status = 'completed'), (state.message = action.payload);
    },
    rejectRequest(state, action: PayloadAction<string>) {
      state.status = 'rejected';
      state.message = action.payload;
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
