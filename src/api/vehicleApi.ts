import axiosClient from "./axiosClient";

const vehicleApi = {
  create: async (vehicle: Vehicle) => {
    console.log("vehicleApi create props",vehicle);
    
    const newVehicle = {
      ...vehicle,
      user_id:vehicle.idUser,
    };
    // const res = await axiosClient.post("/vehicles", vehicle);
    const res = await axiosClient.post("/vehicle/create", newVehicle);
    
    console.log("vehicleApi create response",res);

    return res;
  },
  getById: async (idVehicle: string) => {
    console.log("vehicleApi getById props",idVehicle);
    const res = await axiosClient.get(`/vehicles/${idVehicle}`);
    console.log("vehicleApi getById response",res);

    return res;
  },
  update: async (vehicle: Vehicle) => {
    console.log("vehicleApi update props",vehicle);
    const res = await axiosClient.patch(
      `/vehicles/${vehicle.idVehicle}`,
      vehicle,
    );
    console.log("vehicleApi update response",res);

    return res;
  },
  getByIdUser: async (idUser: string) => {
    console.log("vehicleApi getByIdUser props",idUser);
    
    const res = await axiosClient.get(`/vehicle/get-list/?user_id=${idUser}`);
    // const res = await axiosClient.get(`/vehicles/user/${idUser}`);
    console.log("vehicleApi getByIdUser response",res);
    return res;
  },
  delete: async (idVehicle: string) => {
    console.log("vehicleApi delete props",idVehicle);
    
    const res = await axiosClient.delete(`/vehicles/${idVehicle}`);
    console.log("vehicleApi delete response",res);

    return res;
  },
};

export default vehicleApi;
