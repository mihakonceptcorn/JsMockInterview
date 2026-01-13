import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Framework = 'js' | 'react' | 'react-native' | 'vue';

interface FrameworkState {
  current: Framework;
}

const initialState: FrameworkState = {
  current: 'js',
};

const frameworkSlice = createSlice({
  name: 'framework',
  initialState,
  reducers: {
    setFramework(state, action: PayloadAction<Framework>) {
      state.current = action.payload;
    },
  },
});

export const { setFramework } = frameworkSlice.actions;
export default frameworkSlice.reducer;
