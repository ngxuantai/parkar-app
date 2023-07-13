import axiosClient from "./axiosClient";

const url = "/lots";
// const url = "/lots";

const parkingLotApi = {
  search: async (searchText: string) => {
    console.log("Api - parkingLotApi - search");
    const res = await axiosClient.post(`${url}/search`, {
      searchText,
    });

    console.log("Api - parkingLotApi - search",res);

    return res;
  },
  getAll: async () => {
    console.log("Api - parkingLotApi - getAll");
    // return await axiosClient.get(url);
    const res =  await axiosClient.get("/parking-lot/get-list");
    console.log("Api - parkingLotApi - getAll",res);
    return res;

  },
  getOne: async (id: string) => {
    console.log("Api - parkingLotApi - getOne- paringLot -id ",id);
    // const res =  await axiosClient.get(`${url}/${id}`);
    const res =  await axiosClient.get(`${url}/get-one/${id}`);
    console.log("Api - parkingLotApi - getOne",res);
    return res;

  },
};

export default parkingLotApi;
