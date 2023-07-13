import axiosClient from "./axiosClient";

// const url = "/slots";
const url = "/parking-slot";

const parkingSlotApi = {
  getAll: async (id: string) => {
    // const res = await axiosClient.get(`${url}/lots/${id}`);
    console.log("Api - parkingSlotApi - getAll - prop",id);
    const res = await axiosClient.get(`${url}/lots/${id}`);

    console.log("Api - parkingSlotApi - getAll",res);

    return res.data;
  },
  getAvailableSlots:  async (start: string, end: string, date:  string, id: string) => {
    console.log("Api - parkingSlotApi - getAvailableSlots-props",start, end,date,id );
    // const res = await axiosClient.get(`${url}/availability/${id}?start=${start}&end=${end}&date=${date}`);

    // const res = await axiosClient.get(`${url}/available/${id}?Start=${start}&End=${end}&date=${date}`);
    const res = await axiosClient.get(`${url}/available/`,{
      params:{
        parkingLotId: id,
        start,
        end,
      }
    });
    console.log("Api - parkingSlotApi - getAvailableSlots - response",res);
    return res;
  },
  getTotalSlot:  async (id: string) => {

    console.log("Api - parkingSlotApi - getTotalSlot-props",id);
    const res = await axiosClient.get(`${url}/total/${id}`);
    console.log("Api - parkingSlotApi - getTotalSlot",res);

    return res;
  },
};

export default parkingSlotApi;
