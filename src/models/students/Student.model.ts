import { model, Schema } from 'mongoose';

/**
 * Possible academic status values for a student.
 */
export type StudentStatus = 'active' | 'at-risk' | 'dropped';

/**
 * Student entity interface for type safety.
 */
export interface IStudent {
    _id: string;
    enrollmentId: string;
    name: string;
    department: string;
    semester: number;
    batch: string;
    mentorId?: string;
    status: StudentStatus;
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
    enrollmentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    batch: { type: String, required: true },
    mentorId: { type: String },
    status: {
        type: String,
        enum: ['active', 'at-risk', 'dropped'],
        default: 'active',
    },
}, { timestamps: true });

export const Student = model<IStudent>('Student', studentSchema);
