import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  role: 'student' | 'teacher' | 'admin';
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  nim?: string;
  nidn?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['student', 'teacher', 'admin'],
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    nim: { type: String, unique: true, required: function() { return this.role === 'student'; } },
    nidn: { type: String, unique: true, required: function() { return this.role === 'teacher'; } },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

