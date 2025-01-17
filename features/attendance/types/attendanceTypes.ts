import mongoose, { Document } from "mongoose";

export interface IAttendance extends Document {
  student_id: mongoose.Schema.Types.ObjectId;
  class_id: mongoose.Schema.Types.ObjectId;
  teacher_id: mongoose.Schema.Types.ObjectId;
  date: Date;
  status: "present" | "absent";
}
