import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAttendance extends Document {
  student_id: mongoose.Schema.Types.ObjectId;
  class_id: mongoose.Schema.Types.ObjectId;
  teacher_id: mongoose.Schema.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent';
}

const AttendanceSchema: Schema<IAttendance> = new Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
  },
  { timestamps: true }
);

const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;

