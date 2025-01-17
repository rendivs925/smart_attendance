import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocalStorage, removeLocalStorage } from "@/utils/storage";
import { LOCAL_STORAGE_USER_KEY } from "@/constants";
import { IAuthState } from "@/types";

const initialState: IAuthState = {
  _id: null,
  username: null,
  email: null,
  role: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action: PayloadAction<IAuthState>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLoggedIn = action.payload.isLoggedIn;
      setLocalStorage(LOCAL_STORAGE_USER_KEY, state);
    },
    logout: (state) => {
      state._id = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.isLoggedIn = false;
      removeLocalStorage(LOCAL_STORAGE_USER_KEY);
    },
  },
});

export const { setLoginState, logout } = authSlice.actions;

export default authSlice.reducer;
