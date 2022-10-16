import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { mainCounter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'myCounter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.mainCounter++;
    },
    decrement(state) {
      state.mainCounter--;
    },
    increase(state, action) {
      state.mainCounter = state.mainCounter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
