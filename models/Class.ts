import mongoose, { Schema, Document, Model } from 'mongoose';

interface IClass extends Document {
  class_name: string;
  teacher_id: mongoose.Schema.Types.ObjectId;
}

const ClassSchema: Schema<IClass> = new Schema(
  {
    class_name: { type: String, required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Class: Model<IClass> = mongoose.models.Class || mongoose.model<IClass>('Class', ClassSchema);

export default Class;

