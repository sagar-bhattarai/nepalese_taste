import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
  name: "time",
  initialState: {
    now: Date.now(),
  },
  reducers: {
    setTime: (state) => {
      state.now = Date.now();
    },
  },
});

export const { setTime } = timeSlice.actions;
export default timeSlice.reducer;