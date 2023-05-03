import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { read, utils } from 'xlsx';

import { API } from '../../../API';
import { Entry } from '../../../types/Entry';
import { Message } from '../../../types/Message';
import { Status } from '../../../types/Status';

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

export const fetchDataFromMock = createAsyncThunk<
  Entry[],
  string,
  { rejectValue: string }
>(`${NAMESPACE}/fetchDataFromMock`, async (period, { rejectWithValue }) => {
  try {
    const response = await API.fetchDataFromMock(period);
    return (await response.json()) as Entry[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    const message = 'Ошибка загрузки данных';
    return rejectWithValue(message);
  }
});

export const fetchDataFromFile = createAsyncThunk<
  Entry[],
  string,
  { rejectValue: string }
>(`${NAMESPACE}/fetchDataFromFile`, async (period, { rejectWithValue }) => {
  try {
    const response = await (await API.fetchDataFromFile(period)).arrayBuffer();
    const rawData = read(response);
    return utils.sheet_to_json<Entry>(rawData.Sheets[rawData.SheetNames[0]]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    const message = 'Ошибка загрузки данных';
    return rejectWithValue(message);
  }
});

const isResolved = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('fulfilled')
  );
};

const isPending = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('pending')
  );
};

const isRejected = (action: AnyAction): boolean => {
  if (typeof action.type !== 'string') return false;
  return (
    action.type.startsWith(`${NAMESPACE}/`) && action.type.endsWith('rejected')
  );
};

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
