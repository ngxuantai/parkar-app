import { createAsyncThunk } from "@reduxjs/toolkit";
import vehicleApi from "@src/api/vehicleApi";

const getVehicleAction = createAsyncThunk(
  "vehicles/get",
  async (idUser: string) => {
    const res = await vehicleApi.getByIdUser(idUser);
    return res.data.data;
  },
);

const createVehicleAction = createAsyncThunk(
  "vehicles/create",
  async (vehicle: Vehicle) => {
    try {
      console.log("create vehicle action");

      const res = await vehicleApi.create(vehicle);
      if (res.data.data) {
        return res.data.data;
      }
      console.log("create vehicle action response",res);
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
);

const updateVehicleAction = createAsyncThunk(
  "vehicles/update",
  async (vehicle: Vehicle) => {
    try {
      const res = await vehicleApi.update(vehicle);
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
);

const deleteVehicleAction = createAsyncThunk(
  "vehicles/delete",
  async (idVehicle: string) => {
    try {
      const res = await vehicleApi.delete(idVehicle);
      if (res.data.data) {
        return res.data.data;
      }
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
);

export {
  createVehicleAction,
  getVehicleAction,
  updateVehicleAction,
  deleteVehicleAction,
};
