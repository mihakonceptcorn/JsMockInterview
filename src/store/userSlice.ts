import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isPro: boolean;
}

const initialState: UserState = {
  isPro: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProStatus(state, action: PayloadAction<boolean>) {
      state.isPro = action.payload;
    },
  },
});

export const { setProStatus } = userSlice.actions;
export default userSlice.reducer;
