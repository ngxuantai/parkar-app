import axiosClient from "./axiosClient";

// const url = "/slots";
const url = "/ticket";

export const ticketApi = {
  create: async (data) => {
    console.log("create ticket-props", { data });
    // const res = await axiosClient.get(`${url}/availability/${id}?start=${start}&end=${end}&date=${date}`);

    // const res = await axiosClient.get(`${url}/available/${id}?Start=${start}&End=${end}&date=${date}`);
    const res = await axiosClient.post(`${url}/create/`, data);
    console.log("create ticket", res);
    return res;
  },
};
