import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (
      state,
      action: PayloadAction<{ isLoggedIn: boolean; role: string | null }>,
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

export const { setLoginState, logout } = authSlice.actions;

export default authSlice.reducer;
