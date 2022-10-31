import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from 'firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { RootState } from 'store';
import { createWorkplaceBoilerplate } from 'utils/createWorkplaceBoilerplate';

export type WorkplaceType = {
  id: string;
  name: string;
  users: string[];
};

export const submitNewWorkplace = createAsyncThunk(
  'submitNewWorkplace',
  async (workplace: WorkplaceType, thunkAPI) => {
    const { id } = workplace;
    try {
      await setDoc(doc(db, 'workplaces', id), {
        ...workplace,
      });
      const state = thunkAPI.getState() as RootState;
      const { user } = state;

      try {
        await createWorkplaceBoilerplate(id, user);
      } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue('');
      }

      return workplace;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue('');
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(
      submitNewWorkplace.fulfilled,
      (state, action: PayloadAction<WorkplaceType>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.users = action.payload.users;
      },
    );
  },
});

export const { setWorkplace, resetWorkplace } = workplaceSlice.actions;

export default workplaceSlice;
