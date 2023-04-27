import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dataReducer } from './slices/data/slice';

export const rootReducer = combineReducers({
  data: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
