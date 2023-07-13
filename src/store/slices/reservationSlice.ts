import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  // cancelReservation,
  createReservation,
  getReservationsCompleted,
  getReservationsScheduled,
} from "../actions/reservationAction";

export type ReservationState = Partial<{
  entitiesScheduled: Reservation[];
  entitiesCompleted: Reservation[];
  status: string; 
}>;

const initialState: ReservationState = {
  entitiesScheduled: [],
  entitiesCompleted: [],
  status: ""
};

const actions = [createReservation, getReservationsScheduled];

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      }),
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      }),
    );
    // builder.addCase(
    //   cancelReservation.fulfilled,
    //   (state, { payload }: PayloadAction<Reservation[]>) => {
    //     state.entitiesScheduled = state.entitiesScheduled.filter(e => !payload.includes(e))
    //     state.entitiesCompleted = [...state.entitiesCompleted, ...payload];
    //     state.status = "scheduled";
    //     Spinner.hide();
    //   },
    // );
    builder.addCase(
      createReservation.fulfilled,
      (state, { payload }: PayloadAction<Reservation>) => {
        state.entitiesScheduled.push(payload);
        state.status = "scheduled";
        Spinner.hide();
      },
    );
    builder.addCase(
      getReservationsScheduled.fulfilled,
      (state, { payload }: PayloadAction<Reservation[]>) => {
        state.entitiesScheduled = payload;
        state.status = "scheduled";
        Spinner.hide();
      },
    );
    builder.addCase(
      getReservationsCompleted.fulfilled,
      (state, { payload }: PayloadAction<Reservation[]>) => {
        state.entitiesCompleted = payload;
        state.status = "completed";
      },
    );
  },
});

export const reservationActions = {
  ...reservationSlice.actions,
  createReservation,
  getReservationsScheduled,
  getReservationsCompleted
};

export default reservationSlice;
