import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Class {
  _id: string;
  class_name: string;
  teacher_id: string;
}

interface ClassState {
  classes: Class[];
}

const initialState: ClassState = {
  classes: [],
};

const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses(state, action: PayloadAction<Class[]>) {
      state.classes = action.payload;
    },
    addClass(state, action: PayloadAction<Class>) {
      state.classes.push(action.payload);
    },
  },
});

export const { setClasses, addClass } = classSlice.actions;
export default classSlice.reducer;
