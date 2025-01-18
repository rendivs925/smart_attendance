import { Document } from "mongoose";
import { RoleType } from "@/types/";

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: RoleType;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  nim?: string;
  nidn?: string;
}
