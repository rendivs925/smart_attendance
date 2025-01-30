import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocalStorage, removeLocalStorage } from "@/utils/storage";
import { LOCAL_STORAGE_USER_KEY } from "@/constants";
import { IAuthState } from "@/types";

const initialState: IAuthState = {
  _id: null,
  username: null,
  email: null,
  role: null,
  phone: null,
  nim: null,
  nidn: null,
  createdAt: null,
  updatedAt: null,
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
      state.phone = action.payload.phone;
      state.nim = action.payload.nim;
      state.nidn = action.payload.nidn;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
      setLocalStorage(LOCAL_STORAGE_USER_KEY, state);
    },
    logout: (state) => {
      state._id = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.phone = null;
      state.nim = null;
      state.nidn = null;
      state.createdAt = null;
      state.updatedAt = null;
      removeLocalStorage(LOCAL_STORAGE_USER_KEY);
    },
  },
});

export const { setLoginState, logout } = authSlice.actions;

export default authSlice.reducer;
