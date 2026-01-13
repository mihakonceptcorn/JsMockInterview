import { configureStore } from '@reduxjs/toolkit';
import frameworkReducer from './frameworkSlice';
import resultsReducer from './resultsSlice';

export const store = configureStore({
  reducer: {
    framework: frameworkReducer,
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
