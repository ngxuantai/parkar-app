import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTimeHelper } from "@src/utils";
import { getAvailableSlots } from "../actions/availableSlotAction";

export type AvailableSlotState = Partial<{
  blocks: Block[];
}>;

const initialState: AvailableSlotState = {
  blocks: [],
};

// type BookingKey = keyof typeof initialState.entities;

export const availableSlotSlice = createSlice({
  name: "availableSlot",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAvailableSlots.pending, () => {
      Spinner.show();
    });
    builder.addCase(getAvailableSlots.rejected, () => {
      Spinner.hide();
    });
    builder.addCase(
      getAvailableSlots.fulfilled,
      (state, { payload }: PayloadAction<Block[]>) => {
        state.blocks = payload;
        Spinner.hide();
      },
    );
  },
});

export const availableSlotsActions = {
  ...availableSlotSlice.actions,
  getAvailableSlots,
};

export default availableSlotSlice;
