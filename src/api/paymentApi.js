import axiosClient from "./axiosClient";
// const url = "/slots";
const url = "/payment";

export const paymentApi = {
  create: async (cost) => {
    console.log("create payment-props", { cost });
    const res = await axiosClient.post(`${url}/create_payment`, {
      amount: cost,
    });
    console.log("create payment", res);
    return res.data;
  },
};
