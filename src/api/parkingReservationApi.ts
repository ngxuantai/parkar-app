import axiosClient from "./axiosClient";

const url = "/reservations";

const parkingReservationApi = {
  create: async (data: any) => {
    console.log("Api - parkingReservationApi - create - data ", data);
    // const res = await axiosClient.post(url, data);
    const res = await axiosClient.post(`${url}/create`, data);
    console.log("Api - parkingReservationApi - create - response", res);
    return res.data;
  },
  cancel: async (listId: any) => {
    console.log("Api - parkingReservationApi - cancel - list", listId);

    const res = await axiosClient.put(`${url}/cancel`, { listId });
    console.log("Api - parkingReservationApi - cancel", res);

    return res.data;
  },
  getAllByIdUser: async (idUser: string, status: string) => {
    console.log(
      "Api - parkingReservationApi - getAllByIdUser - idUser & status",
      { idUser, status },
    );

    const res = await axiosClient.get(`${url}/user/${idUser}?status=${status}`);
    console.log("Api - parkingReservationApi - getAllByIdUser", res);

    return res.data;
  },
};

export default parkingReservationApi;
