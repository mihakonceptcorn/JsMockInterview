import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  uploadUserData,
  downloadUserData,
  syncUserData,
  UserData,
} from '@/services/firestoreService';
import { setResult } from './resultsSlice';
import type { AppDispatch, RootState } from './index';

interface SyncState {
  isSyncing: boolean;
  lastSyncTime: number | null;
  syncError: string | null;
}

const initialState: SyncState = {
  isSyncing: false,
  lastSyncTime: null,
  syncError: null,
};

export const uploadDataToFirestore = createAsyncThunk<
  void,
  { userId: string },
  { state: RootState }
>('sync/uploadData', async ({ userId }, { getState }) => {
  const state = getState();

  const userData: UserData = {
    results: state.results.current,
    lastModified: Date.now(),
  };

  await uploadUserData(userId, userData);
});

export const downloadDataFromFirestore = createAsyncThunk<
  UserData | null,
  { userId: string },
  { dispatch: AppDispatch }
>('sync/downloadData', async ({ userId }, { dispatch }) => {
  const userData = await downloadUserData(userId);

  if (userData) {
    Object.entries(userData.results).forEach(([framework, stages]) => {
      Object.entries(stages).forEach(([stageId, data]) => {
        dispatch(
          setResult({
            framework,
            stageId,
            ...data,
          })
        );
      });
    });
  }

  return userData;
});

export const syncWithFirestore = createAsyncThunk<
  UserData,
  { userId: string },
  { state: RootState; dispatch: AppDispatch }
>('sync/syncData', async ({ userId }, { getState, dispatch }) => {
  const state = getState();

  const localData: UserData = {
    results: state.results.current,
    lastModified: Date.now(),
  };

  const mergedData = await syncUserData(userId, localData);

  Object.entries(mergedData.results).forEach(([framework, stages]) => {
    Object.entries(stages).forEach(([stageId, data]) => {
      dispatch(
        setResult({
          framework,
          stageId,
          ...data,
        })
      );
    });
  });

  return mergedData;
});

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    clearSyncError(state) {
      state.syncError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadDataToFirestore.pending, (state) => {
      state.isSyncing = true;
      state.syncError = null;
    });
    builder.addCase(uploadDataToFirestore.fulfilled, (state) => {
      state.isSyncing = false;
      state.lastSyncTime = Date.now();
    });
    builder.addCase(uploadDataToFirestore.rejected, (state, action) => {
      state.isSyncing = false;
      state.syncError = action.error.message || 'Upload failed';
    });

    builder.addCase(downloadDataFromFirestore.pending, (state) => {
      state.isSyncing = true;
      state.syncError = null;
    });
    builder.addCase(downloadDataFromFirestore.fulfilled, (state) => {
      state.isSyncing = false;
      state.lastSyncTime = Date.now();
    });
    builder.addCase(downloadDataFromFirestore.rejected, (state, action) => {
      state.isSyncing = false;
      state.syncError = action.error.message || 'Download failed';
    });

    builder.addCase(syncWithFirestore.pending, (state) => {
      state.isSyncing = true;
      state.syncError = null;
    });
    builder.addCase(syncWithFirestore.fulfilled, (state) => {
      state.isSyncing = false;
      state.lastSyncTime = Date.now();
    });
    builder.addCase(syncWithFirestore.rejected, (state, action) => {
      state.isSyncing = false;
      state.syncError = action.error.message || 'Sync failed';
    });
  },
});

export const { clearSyncError } = syncSlice.actions;
export default syncSlice.reducer;
