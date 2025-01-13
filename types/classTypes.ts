import mongoose, { Document } from "mongoose";

export interface IClass extends Document {
  class_name: string;
  teacher_id: mongoose.Schema.Types.ObjectId;
}
