import { createAsyncThunk } from "@reduxjs/toolkit";
import { timeFrameApi } from "@src/api";

const getTimeFrames = createAsyncThunk("timeFrame/get", async (id: string) => {
  const res = await timeFrameApi.getAll(id);
  console.log("res getTimeFrames ACtion", res);
  // return res.data.data;
  return res.data.data.data;
});

export { getTimeFrames };
