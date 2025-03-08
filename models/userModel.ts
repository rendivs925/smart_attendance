import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "@/types";

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["Student", "Teacher", "Admin"],
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    nim: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "Student";
      },
    },
    nidn: {
      type: String,
      unique: true,
      required: function () {
        return this.role === "Teacher";
      },
    },
  },
  { timestamps: true },
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
