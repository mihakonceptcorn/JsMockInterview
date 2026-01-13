import { configureStore } from '@reduxjs/toolkit';
import frameworkReducer from './frameworkSlice';

export const store = configureStore({
  reducer: {
    framework: frameworkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
