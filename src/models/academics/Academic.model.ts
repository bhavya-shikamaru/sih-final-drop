import { model, Schema, Types } from 'mongoose';

export interface IAcademic extends Document {
    studentId: Types.ObjectId;
    subjectCode: string;
    assessmentType: "quiz" | "midsem" | "endsem";
    score: number;
    maxScore: number;
    attemptNumber: number;
}

const academicSchema = new Schema<IAcademic>({
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subjectCode: { type: String, required: true },
    assessmentType: { type: String, enum: ["quiz", "midsem", "endsem"], required: true },
    score: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    attemptNumber: { type: Number, required: true, default: 1 },
}, { timestamps: true });

export const Academic = model<IAcademic>('Academic', academicSchema);
