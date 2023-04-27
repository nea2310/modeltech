/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FirebaseAPI } from '../../../API';
import { Message } from '../../../types/Message';
import { Status } from '../../../types/Status';

type Entry = { date: string; water: string; oil: string };

type InitialState = {
  entries: Entry[];
  status: Status;
  errorMessage: Message;
};

const initialState: InitialState = {
  status: 'idle',
  errorMessage: null,
  entries: [],
};

const NAMESPACE = 'data';

export const fetchData = createAsyncThunk<
  Entry[],
  string,
  { rejectValue: string }
>(`${NAMESPACE}/fetchData`, async (period, { rejectWithValue }) => {
  try {
    const response = await FirebaseAPI.fetchData(period);
    const data = (await response.json()) as Entry[];
    console.log(data);

    if (response === null) {
      return rejectWithValue('data not found');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue('An unexpected error occurred');
  }
});

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.entries = payload;
        state.errorMessage = null;
      })
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.errorMessage = null;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.status = 'rejected';
        if (typeof payload === 'string') state.errorMessage = payload;
      });
  },
});

const dataReducer = slice.reducer;

export { dataReducer, initialState };
