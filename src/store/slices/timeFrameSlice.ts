import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTimeFrames } from "../actions/timeFrameAction";

export type TimeFrameState = Partial<{
  entities: TimeFrame[];
}>;

const initialState: TimeFrameState = {
  entities: [],
};

export const timeFrameSlice = createSlice({
  name: "timeFrame",
  initialState,
  reducers: {
    update: (
      state: TimeFrameState,
      { payload }: PayloadAction<TimeFrame[]>,
    ) => {
      state.entities = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeFrames.fulfilled, (state, { payload }) => {
      state.entities = payload;
    });
  },
});

export const timeFrameActions = {
  ...timeFrameSlice.actions,
  getTimeFrames,
};

export default timeFrameSlice;
