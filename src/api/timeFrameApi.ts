import axiosClient from "./axiosClient";

const timeFrameApi = {
  getAll: async (parkingLotId: any) => {
    console.log("Api - timeFrameApi - getAll - id",parkingLotId);
    // const res = await axiosClient.get(`/time/${parkingLotId}/time-frame`);
    const res = await axiosClient.get("/time-frame/get-all",{
      params:{
        parkingLotId,
      }
    });
    console.log("Api - timeFrameApi - getAll", res);
    return res;
  },
};

export default timeFrameApi;
