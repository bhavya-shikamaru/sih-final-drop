import { model, Schema, Types } from 'mongoose';

export interface IAttendance extends Document {
    studentId: Types.ObjectId;
    subjectCode: string;
    attendancePercentage: number;
    totalClasses: number;
    attendedClasses: number;
}

const attendanceSchema = new Schema<IAttendance>({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subjectCode: { type: String, required: true },
    attendancePercentage: { type: Number, required: true },
    totalClasses: { type: Number, required: true },
    attendedClasses: { type: Number, required: true },
}, { timestamps: true });

export const Attendance = model<IAttendance>('Attendance', attendanceSchema);
