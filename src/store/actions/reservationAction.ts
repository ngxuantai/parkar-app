import { createAsyncThunk } from "@reduxjs/toolkit";
import { parkingReservationApi } from "@src/api";

const getReservationsScheduled = createAsyncThunk(
  "reservation/getScheduled",
  async (idUser: string) => {
    const res = await parkingReservationApi.getAllByIdUser(idUser, "scheduled");
    return res.data;
  },
);
const getReservationsCompleted = createAsyncThunk(
  "reservation/getCompleted",
  async (idUser: string) => {
    console.log("parkingReservationApi - completed");

    // const res = await parkingReservationApi.getAllByIdUser(idUser, "end");
    const res = await parkingReservationApi.getAllByIdUser(idUser, "end");
    console.log("parkingReservationApi - completed - res.data", res.data);
    return res.data;
  },
);
const createReservation = createAsyncThunk(
  "reservation/create",
  async (data: any) => {
    const res = await parkingReservationApi.create(data);
    console.log("action create reservatioin - response ", res.data);
    return res.data;
  },
);
// const cancelReservation = createAsyncThunk(
//   "reservation/cancel",
//   async (arrID: any) => {
//     const res = await parkingReservationApi.cancel(arrID);
//     return res.data;
//   },
// );

export {
  getReservationsScheduled,
  createReservation,
  getReservationsCompleted,
};
