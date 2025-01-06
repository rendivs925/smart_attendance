import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReduceer from "./slices/authSlice";
import classReducer from "./slices/classSlice";
import attendanceReducer from "./slices/attendanceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    classes: classReducer,
    auth: authReduceer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
