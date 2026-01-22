import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import frameworkReducer from './frameworkSlice';
import resultsReducer from './resultsSlice';
import syncReducer from './syncSlice';
import firestoreSyncMiddleware from './middleware/firestoreSyncMiddleware';

const rootReducer = combineReducers({
  framework: frameworkReducer,
  results: resultsReducer,
  sync: syncReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['framework', 'results'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(firestoreSyncMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
