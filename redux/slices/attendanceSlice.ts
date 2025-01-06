import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Attendance {
  student_id: string;
  class_id: string;
  teacher_id: string;
  date: string;
  status: "present" | "absent";
}

interface AttendanceState {
  attendanceList: Attendance[];
}

const initialState: AttendanceState = {
  attendanceList: [],
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setAttendance(state, action: PayloadAction<Attendance[]>) {
      state.attendanceList = action.payload;
    },
    addAttendance(state, action: PayloadAction<Attendance>) {
      state.attendanceList.push(action.payload);
    },
  },
});

export const { setAttendance, addAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
