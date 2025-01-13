import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: "student" | "teacher" | "admin";
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  nim?: string;
  nidn?: string;
}
