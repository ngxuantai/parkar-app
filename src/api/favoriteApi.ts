import axiosClient from "./axiosClient";

const url = "/favorite";

const favoriteApi = {
  // getAll: async (idUser: any,) => {
  getAll: async (idUser: any, parkingLotId: any) => {
    console.log("Api - favoriteApi - getAll - idUser", idUser);
    // const res = await axiosClient.get(url + "/user/" + idUser);
    const res = await axiosClient.get(url + "/get-all", {
      params: {
        userId: idUser,
      },
    });
    console.log("Api - favoriteApi - getAll", res);
    return res.data;
  },
  create: async (params: any) => {
    console.log("Api - favoriteApi - create - params", params);
    // const res = await axiosClient.post(url, params);
    const res = await axiosClient.post(`${url}/create`, {
      userId: params.idUser,
      parkingLotId: params.id,
    });
    console.log("Api - favoriteApi - create", res);
    return res.data;
  },
  deleteOne: async (idFavorite: any) => {
    console.log("Api - favoriteApi - deleteOne - idFavourite", idFavorite);
    const res = await axiosClient.delete(url + "/delete/" + idFavorite);

    console.log("Api - favoriteApi - deleteOne", res);

    return res.data;
  },
};

export default favoriteApi;
