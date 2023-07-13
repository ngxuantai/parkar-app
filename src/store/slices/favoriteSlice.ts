import { Spinner } from "@nghinv/react-native-loading";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createFavorite,
  getFavorites,
  deleteFavorite,
} from "../actions/favoriteAction";

export type FavoriteState = Partial<{
  entities: ParkingLot[];
}>;

const initialState: FavoriteState = {
  entities: [],
};

const actions = [createFavorite, getFavorites, deleteFavorite];

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers(builder) {
    actions.forEach((thunk) =>
      builder.addCase(thunk.pending, () => {
        Spinner.show();
      }),
    );
    actions.forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        Spinner.hide();
      }),
    );
    builder.addCase(
      createFavorite.fulfilled,
      (state, { payload }: PayloadAction<ParkingLot>) => {
        state.entities.push(payload);
        Spinner.hide();
      },
    );
    builder.addCase(
      getFavorites.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        console.log("favourite reducer payload", payload);
        state.entities = payload[0]?.ParkingLots;
        Spinner.hide();
      },
    );
    builder.addCase(
      deleteFavorite.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.entities = state.entities.filter(
          (favorite) => favorite.id !== payload,
        );
        Spinner.hide();
      },
    );
  },
});

export const favoriteActions = {
  ...favoriteSlice.actions,
  createFavorite,
  getFavorites,
  deleteFavorite,
};

export default favoriteSlice;
