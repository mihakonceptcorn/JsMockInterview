import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultData {
  framework: string;
  stageId: string;
  score: number;
  total: number;
  title: string;
  time: string;
}

interface ResultsState {
  current: Record<string, ResultData>;
}

const initialState: ResultsState = {
  current: {},
};

interface ResultPayload extends ResultData {
  framework: string;
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResult(state, action: PayloadAction<ResultPayload>) {
      const { framework, stageId, ...data } = action.payload;

      if (!state.current[framework]) {
        state.current[framework] = {};
        state.current[framework][stageId] = data;
      } else {
        state.current[framework][stageId] = data;
      }
    },
  },
});

export const { setResult } = resultsSlice.actions;
export default resultsSlice.reducer;
