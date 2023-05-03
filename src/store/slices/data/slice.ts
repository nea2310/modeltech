/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { read, utils } from 'xlsx';

import { API } from '../../../API';
import { Entry } from '../../../types/Entry';
import { Message } from '../../../types/Message';
import { Status } from '../../../types/Status';

import { EMPTY_BUFFER_SIZE, ERROR_MESSAGE, NAMESPACE } from './constants';
import { formatDate, isPending, isRejected, isResolved } from './helpers';

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

export const fetchDataFromMock = createAsyncThunk<
  Entry[],
  string,
  { rejectValue: string }
>(`${NAMESPACE}/fetchDataFromMock`, async (period, { rejectWithValue }) => {
  try {
    const response = await API.fetchDataFromMock(period);
    if (response.status !== 200) return rejectWithValue(ERROR_MESSAGE);
    const rawData = await response.json();
    return rawData as Entry[];
  } catch (error) {
    return rejectWithValue(ERROR_MESSAGE);
  }
});

export const fetchDataFromFile = createAsyncThunk<
  Entry[],
  string,
  { rejectValue: string }
>(`${NAMESPACE}/fetchDataFromFile`, async (period, { rejectWithValue }) => {
  try {
    const response = await (await API.fetchDataFromFile(period)).arrayBuffer();

    const view = new DataView(response);
    if (view.byteLength <= EMPTY_BUFFER_SIZE)
      return rejectWithValue(ERROR_MESSAGE);
    const rawData = read(response);
    const rawEntries = utils.sheet_to_json<Entry>(
      rawData.Sheets[rawData.SheetNames[0]]
    );

    const data = rawEntries.map((item) => {
      const [rawDate, water, oil] = Object.values(item);
      const date = formatDate(Number(rawDate));
      return { date, water, oil };
    });
    return data;
  } catch (error) {
    return rejectWithValue(ERROR_MESSAGE);
  }
});

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isResolved, (state, action: PayloadAction<Entry[]>) => {
        state.status = 'resolved';
        state.entries = action.payload;
        state.errorMessage = null;
      })

      .addMatcher(isPending, (state) => {
        state.status = 'loading';
        state.entries = [];
        state.errorMessage = null;
      })

      .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
        state.status = 'rejected';
        state.entries = [];
        state.errorMessage = action.payload;
      });
  },
});

const dataReducer = slice.reducer;

export { dataReducer, initialState };
