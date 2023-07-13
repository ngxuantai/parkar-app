import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import availableSlotSlice from "./slices/availableSlotSlice";
import bookingSlice from "./slices/bookingSlice";
import favoriteSlice from "./slices/favoriteSlice";
import reservationSlice from "./slices/reservationSlice";
import timeFrameSlice from "./slices/timeFrameSlice";
import { userSlice } from "./slices/userSlice";
import { vehicleSlice } from "./slices/vehicleSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    vehicles: vehicleSlice.reducer,
    reservation: reservationSlice.reducer,
    booking: bookingSlice.reducer,
    timeFrame: timeFrameSlice.reducer,
    availableSlot: availableSlotSlice.reducer,
    favorite: favoriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
