import { createAsyncThunk } from "@reduxjs/toolkit";
import { favoriteApi } from "@src/api";

const getFavorites = createAsyncThunk(
  "favorite/get",
  async (idUser: string) => {
    const res = await favoriteApi.getAll(idUser);
    console.log("favourite/getall - response", res);
    return res.data;
  },
);

const createFavorite = createAsyncThunk(
  "favorite/create",
  async (data: any) => {
    console.log("favorite/create", data);
    const res = await favoriteApi.create(data);
    return res.data;
  },
);

const deleteFavorite = createAsyncThunk(
  "favorite/delete",
  async (idFav: any) => {
    const res = await favoriteApi.deleteOne(idFav);
    return res.data;
  },
);

export { getFavorites, createFavorite, deleteFavorite };
