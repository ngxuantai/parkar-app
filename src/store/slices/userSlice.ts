import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, getUser, login, updateUser } from "../actions/userAction";

type UserState = Partial<{
  data: User;
  errorMessage: string;
  isLoading: boolean;
}>;

const initialState: UserState = {
  data: undefined,
  errorMessage: "",
  isLoading: false,
};

const arrAction = [login, createUser];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginWithOauth: (state: UserState, action: any) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    arrAction.forEach((thunk) =>
      builder.addCase(thunk.pending, (state) => {
        state.isLoading = true;
      }),
    );
    arrAction.forEach((thunk) =>
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = { ...action.payload };
      }),
    );
    arrAction.forEach((thunk) =>
      builder.addCase(thunk.rejected, (state, action: any) => {
        state.isLoading = false;
        if (action.payload) {
          state.errorMessage = action.payload.errorMessage;
        }
      }),
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.data = payload;
      },
    );
    builder.addCase(
      getUser.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.data = payload;
      },
    );
    builder.addCase(getUser.rejected, (state, action) => {
      state = initialState;
      AsyncStorage.removeItem("idUser");
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  createUser,
  getUser,
  login,
  updateUser,
};
